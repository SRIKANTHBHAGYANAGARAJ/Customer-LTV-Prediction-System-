"""
Monte Carlo revenue forecasting over a future horizon, using the per-customer
posterior purchase-rate, p_alive, and monetary-value estimates from clv_model.

For each of num_simulations runs:
  - each customer is independently "alive" with probability p_alive_i
  - if alive, their number of future purchases ~ Poisson(posterior_rate_i * horizon_days)
  - each purchase's value ~ Gamma(shape=dispersion, scale=est_value_i/dispersion)
    (keeps mean == est_value_i while adding realistic purchase-to-purchase noise)
  - revenue_i = sum of that customer's simulated purchase values
  - total = sum(revenue_i) across all customers

This produces an empirical distribution of total future revenue (and, summed
per segment, per-segment distributions) instead of a single point estimate,
which is the main value Monte Carlo adds over a naive lambda*value*horizon
calculation: it surfaces the uncertainty band, not just the mean.
"""
import numpy as np


def run_monte_carlo(scored_customers, horizon_days, num_simulations, monetary_dispersion_shape, seed=42, segment_of=None):
    rng = np.random.default_rng(seed)

    customer_ids = list(scored_customers.keys())
    n = len(customer_ids)
    p_alive = np.array([scored_customers[c]["p_alive"] for c in customer_ids])
    rate = np.array([scored_customers[c]["posterior_daily_purchase_rate"] for c in customer_ids])
    value = np.array([max(scored_customers[c]["est_monetary_value"], 0.01) for c in customer_ids])

    totals = np.zeros(num_simulations)
    per_customer_revenue_sum = np.zeros(n)  # accumulate to report expected value per customer too

    segment_totals = None
    if segment_of is not None:
        segments = sorted(set(segment_of.values()))
        seg_index = {s: i for i, s in enumerate(segments)}
        seg_arr = np.array([seg_index[segment_of[c]] for c in customer_ids])
        segment_totals = np.zeros((num_simulations, len(segments)))

    for s in range(num_simulations):
        alive = rng.random(n) < p_alive
        n_purchases = rng.poisson(rate * horizon_days)
        n_purchases = np.where(alive, n_purchases, 0)

        revenue = np.zeros(n)
        nonzero = np.nonzero(n_purchases)[0]
        for idx in nonzero:
            k = n_purchases[idx]
            purchase_values = rng.gamma(
                shape=monetary_dispersion_shape,
                scale=value[idx] / monetary_dispersion_shape,
                size=k,
            )
            revenue[idx] = purchase_values.sum()

        totals[s] = revenue.sum()
        per_customer_revenue_sum += revenue
        if segment_totals is not None:
            for i, seg_i in enumerate(seg_arr):
                segment_totals[s, seg_i] += revenue[i]

    summary = {
        "horizon_days": horizon_days,
        "num_simulations": num_simulations,
        "mean": float(totals.mean()),
        "median": float(np.median(totals)),
        "p10": float(np.percentile(totals, 10)),
        "p90": float(np.percentile(totals, 90)),
        "std": float(totals.std()),
    }
    expected_revenue_per_customer = {
        cid: round(float(per_customer_revenue_sum[i] / num_simulations), 2)
        for i, cid in enumerate(customer_ids)
    }

    segment_summary = None
    if segment_totals is not None:
        segment_summary = {}
        for seg, i in seg_index.items():
            col = segment_totals[:, i]
            segment_summary[seg] = {
                "mean": float(col.mean()),
                "median": float(np.median(col)),
                "p10": float(np.percentile(col, 10)),
                "p90": float(np.percentile(col, 90)),
            }

    return {
        "summary": summary,
        "expected_revenue_per_customer": expected_revenue_per_customer,
        "segment_summary": segment_summary,
        "sample_totals": totals[:200].round(2).tolist(),  # small sample for charting, not the full 2000
    }
