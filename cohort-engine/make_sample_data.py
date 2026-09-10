"""
Generates synthetic customer + transaction data for the CLV/Cohort engine.

Simulation model (per customer i):
  - acquisition_date: uniform within their monthly cohort.
  - underlying purchase rate lambda_i ~ Gamma(shape=1.4, scale=1/45)  [purchases/day]
  - "alive" survival: shifted-Beta-Geometric style -- each customer draws a
    fixed per-period (30-day) retention probability r_i ~ Beta(3, 7), and
    at the end of each 30-day period since acquisition, survives with
    probability r_i (independent draws), simulated until AS_OF_DATE or churn.
  - while alive, purchases in each 30-day period ~ Poisson(lambda_i * 30).
  - per-customer average order value mu_i ~ Lognormal(mean=3.5, sigma=0.55)
    (~$25-$110), individual transaction amounts ~ Gamma(shape=5, scale=mu_i/5).

Fixed random seed -> deterministic output, checked into sample_data/.
"""
import csv
import random
from datetime import date, timedelta

import numpy as np

SEED = 7
AS_OF_DATE = date(2026, 6, 30)
N_COHORTS = 12  # monthly cohorts, July 2025 .. June 2026
CUSTOMERS_PER_COHORT = 50


def month_add(d: date, months: int) -> date:
    m = d.month - 1 + months
    y = d.year + m // 12
    m = m % 12 + 1
    return date(y, m, 1)


def random_day_in_month(rng: random.Random, month_start: date) -> date:
    next_month = month_add(month_start, 1)
    days_in_month = (next_month - month_start).days
    return month_start + timedelta(days=rng.randrange(days_in_month))


def simulate_customer(rng: random.Random, np_rng: np.random.Generator, cust_id: int, cohort_start: date):
    acquisition_date = random_day_in_month(rng, cohort_start)
    if acquisition_date > AS_OF_DATE:
        return None

    lam = np_rng.gamma(shape=1.4, scale=1.0 / 45.0)  # purchases/day
    retention_p = np_rng.beta(3, 7)  # per-30-day-period survival probability
    mu = np_rng.lognormal(mean=3.5, sigma=0.55)  # customer's average order value

    orders = []
    period_start = acquisition_date
    alive = True
    # first purchase happens on acquisition (this is what "acquisition" means here)
    orders.append(period_start)

    while alive:
        period_end = period_start + timedelta(days=30)
        if period_end > AS_OF_DATE:
            break
        n_purchases = np_rng.poisson(lam * 30)
        for _ in range(n_purchases):
            offset = rng.randrange(30)
            orders.append(period_start + timedelta(days=offset))
        # survive to next period?
        if np_rng.random() > retention_p:
            alive = False
            break
        period_start = period_end

    orders = sorted(o for o in orders if o <= AS_OF_DATE)
    amounts = [max(1.0, round(float(np_rng.gamma(shape=5.0, scale=mu / 5.0)), 2)) for _ in orders]
    cohort_label = f"{cohort_start.year:04d}-{cohort_start.month:02d}"
    return {
        "customer_id": cust_id,
        "cohort": cohort_label,
        "acquisition_date": acquisition_date.isoformat(),
        "orders": list(zip(orders, amounts)),
    }


def main():
    rng = random.Random(SEED)
    np_rng = np.random.default_rng(SEED)

    first_cohort = date(2025, 7, 1)
    rows = []
    cust_id = 1
    for c in range(N_COHORTS):
        cohort_start = month_add(first_cohort, c)
        if cohort_start > AS_OF_DATE:
            break
        for _ in range(CUSTOMERS_PER_COHORT):
            result = simulate_customer(rng, np_rng, cust_id, cohort_start)
            cust_id += 1
            if result is None:
                continue
            for order_date, amount in result["orders"]:
                rows.append({
                    "customer_id": result["customer_id"],
                    "cohort": result["cohort"],
                    "acquisition_date": result["acquisition_date"],
                    "order_date": order_date.isoformat(),
                    "order_amount": amount,
                })

    rows.sort(key=lambda r: (r["customer_id"], r["order_date"]))

    out_path = "sample_data/transactions.csv"
    with open(out_path, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["customer_id", "cohort", "acquisition_date", "order_date", "order_amount"])
        writer.writeheader()
        writer.writerows(rows)

    n_customers = len({r["customer_id"] for r in rows})
    print(f"Wrote {len(rows)} transactions for {n_customers} customers -> {out_path}")


if __name__ == "__main__":
    main()
