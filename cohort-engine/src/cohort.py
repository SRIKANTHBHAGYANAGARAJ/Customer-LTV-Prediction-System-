"""
Cohort retention analysis.

Groups customers by acquisition month and computes, for each cohort, the
percentage of customers who placed at least one order in each subsequent
30-day period since acquisition ("period 0" = acquisition period itself).
"""
from collections import defaultdict
from datetime import date, datetime, timedelta


def _parse(d):
    return d if isinstance(d, date) else datetime.strptime(d, "%Y-%m-%d").date()


def build_retention_table(transactions, as_of_date, max_periods=12, period_days=30):
    """
    transactions: list of dicts with customer_id, cohort, acquisition_date, order_date
    Returns: {cohort_label: {"size": N, "retention": [pct_period0, pct_period1, ...]}}
    """
    as_of_date = _parse(as_of_date)

    customers = {}  # customer_id -> (cohort, acquisition_date)
    orders_by_customer = defaultdict(list)
    for t in transactions:
        cid = t["customer_id"]
        customers[cid] = (t["cohort"], _parse(t["acquisition_date"]))
        orders_by_customer[cid].append(_parse(t["order_date"]))

    cohort_customers = defaultdict(list)
    for cid, (cohort, acq) in customers.items():
        cohort_customers[cohort].append(cid)

    table = {}
    for cohort, cust_ids in sorted(cohort_customers.items()):
        size = len(cust_ids)
        retention = []
        for period in range(max_periods):
            active = 0
            for cid in cust_ids:
                acq = customers[cid][1]
                period_start = acq + timedelta(days=period * period_days)
                period_end = acq + timedelta(days=(period + 1) * period_days)
                if period_start > as_of_date:
                    continue  # cohort hasn't reached this period yet -- excluded, not a churn
                has_order = any(period_start <= od < period_end for od in orders_by_customer[cid])
                if has_order:
                    active += 1
            eligible = sum(
                1 for cid in cust_ids
                if customers[cid][1] + timedelta(days=period * period_days) <= as_of_date
            )
            pct = round(100.0 * active / eligible, 1) if eligible else None
            retention.append({"period": period, "eligible": eligible, "active": active, "pct_active": pct})
        table[cohort] = {"size": size, "retention": retention}
    return table


def population_period_over_period_retention(retention_table):
    """
    Rough population-level average month-over-month survival probability,
    used as a simplified prior for the dropout ("alive") estimate in
    clv_model.py. Computed as the geometric mean, across cohorts with enough
    data, of period(n+1)_active / period(n)_active ratios.
    """
    ratios = []
    for cohort, data in retention_table.items():
        r = data["retention"]
        for i in range(len(r) - 1):
            a, b = r[i], r[i + 1]
            if a["pct_active"] and b["pct_active"] is not None and a["active"] > 0:
                ratio = b["active"] / a["active"]
                if 0 < ratio <= 1.5:
                    ratios.append(ratio)
    if not ratios:
        return 0.5
    log_ratios = [__import__("math").log(r) for r in ratios if r > 0]
    if not log_ratios:
        return 0.5
    geo_mean = __import__("math").exp(sum(log_ratios) / len(log_ratios))
    return max(0.05, min(0.98, geo_mean))
