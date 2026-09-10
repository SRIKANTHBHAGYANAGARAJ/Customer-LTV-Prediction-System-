"""
Probabilistic per-customer CLV inputs, built from scratch with numpy only.

This is a simplified, method-of-moments empirical-Bayes model *inspired by*
the BG/NBD + Gamma-Gamma framework used in industry CLV tooling (lifetimes,
etc.), not a full maximum-likelihood BG/NBD fit. Three pieces:

1. Purchase rate (Poisson-Gamma / "Gamma-Poisson" model):
   Each customer's daily purchase rate lambda_i is assumed Poisson-distributed
   given lambda_i, and lambda_i ~ Gamma(r, alpha) across the population. Given
   a customer's observed repeat-purchase count x_i over their tenure T_i days,
   the conjugate posterior is Gamma(r + x_i, alpha + T_i). We estimate the
   population prior (r, alpha) via method of moments on the observed x_i/T_i
   rates, then report each customer's posterior mean as their fitted rate.

2. Dropout / "is still active" (simplified Beta-Geometric):
   We don't fit a full BG mixture; instead we take the population-level
   period-over-period retention probability estimated from the cohort curve
   (cohort.population_period_over_period_retention) and raise it to the power
   of "how many 30-day periods have passed since this customer's last order"
   as a recency-decayed probability of still being alive. This is explicitly
   a heuristic simplification -- see README limitations.

3. Monetary value (Gamma-Gamma-style shrinkage):
   Each customer's average order value is shrunk toward the population mean,
   weighted by how many orders we've observed from them, using the classic
   Gamma-Gamma empirical-Bayes formula:
       est_value_i = (population_shape * population_mean + x_i * avg_value_i) / (population_shape + x_i)
   so customers with few orders regress heavily toward the population
   average, and customers with many orders are trusted more.
"""
from collections import defaultdict
from datetime import date, datetime

import numpy as np

from .cohort import population_period_over_period_retention


def _parse(d):
    return d if isinstance(d, date) else datetime.strptime(d, "%Y-%m-%d").date()


def build_customer_features(transactions, as_of_date):
    """Aggregate raw transactions into one row of RFM/BTYD-style features per customer."""
    as_of_date = _parse(as_of_date)
    by_customer = defaultdict(list)
    cohort_of = {}
    acq_of = {}
    for t in transactions:
        cid = t["customer_id"]
        by_customer[cid].append((_parse(t["order_date"]), float(t["order_amount"])))
        cohort_of[cid] = t["cohort"]
        acq_of[cid] = _parse(t["acquisition_date"])

    features = {}
    for cid, orders in by_customer.items():
        orders.sort(key=lambda o: o[0])
        acq = acq_of[cid]
        last_order_date = orders[-1][0]
        T = max((as_of_date - acq).days, 1)  # customer age in days
        x = len(orders) - 1  # repeat purchases (BG/NBD convention: first order excluded)
        recency_days = (last_order_date - acq).days
        days_since_last_order = (as_of_date - last_order_date).days
        total_spend = sum(a for _, a in orders)
        avg_order_value = total_spend / len(orders)
        features[cid] = {
            "customer_id": cid,
            "cohort": cohort_of[cid],
            "acquisition_date": acq.isoformat(),
            "num_orders": len(orders),
            "x_repeat_orders": x,
            "T_age_days": T,
            "recency_days": recency_days,
            "days_since_last_order": days_since_last_order,
            "total_spend": round(total_spend, 2),
            "avg_order_value": round(avg_order_value, 2),
        }
    return features


def fit_population_purchase_prior(features, min_shape=0.5):
    """Method-of-moments fit of Gamma(r, alpha) prior on purchase rate x/T across customers."""
    rates = np.array([f["x_repeat_orders"] / f["T_age_days"] for f in features.values()])
    mean = rates.mean()
    var = rates.var()
    if var <= 1e-12 or mean <= 0:
        r, alpha = max(min_shape, 1.0), 1.0
    else:
        r = max(min_shape, mean ** 2 / var)
        alpha = max(1e-6, mean / var)
    return {"r": float(r), "alpha": float(alpha)}


def fit_population_monetary_prior(features, min_shape=1.0):
    values = np.array([f["avg_order_value"] for f in features.values() if f["num_orders"] >= 1])
    mean = values.mean()
    var = values.var()
    shape = max(min_shape, (mean ** 2 / var) if var > 1e-9 else min_shape)
    return {"shape": float(shape), "mean": float(mean)}


def score_customers(transactions, as_of_date, retention_table, min_prior_shape=0.5, min_monetary_shape=1.0):
    """
    Returns {customer_id: {...features, posterior_rate, p_alive, est_monetary_value}}
    """
    features = build_customer_features(transactions, as_of_date)
    purchase_prior = fit_population_purchase_prior(features, min_prior_shape)
    monetary_prior = fit_population_monetary_prior(features, min_monetary_shape)
    pop_retention = population_period_over_period_retention(retention_table)

    r, alpha = purchase_prior["r"], purchase_prior["alpha"]
    m_shape, m_mean = monetary_prior["shape"], monetary_prior["mean"]

    scored = {}
    for cid, f in features.items():
        post_shape = r + f["x_repeat_orders"]
        post_rate = alpha + f["T_age_days"]
        posterior_daily_rate = post_shape / post_rate  # posterior mean of Gamma(post_shape, rate=post_rate)

        periods_since_last = f["days_since_last_order"] / 30.0
        p_alive = pop_retention ** periods_since_last

        est_value = (m_shape * m_mean + f["x_repeat_orders"] * f["avg_order_value"]) / (m_shape + f["x_repeat_orders"])

        scored[cid] = {
            **f,
            "posterior_shape": post_shape,
            "posterior_rate_param": post_rate,
            "posterior_daily_purchase_rate": posterior_daily_rate,
            "p_alive": round(float(p_alive), 4),
            "est_monetary_value": round(float(est_value), 2),
        }
    meta = {
        "purchase_prior": purchase_prior,
        "monetary_prior": monetary_prior,
        "population_period_retention": round(float(pop_retention), 4),
    }
    return scored, meta
