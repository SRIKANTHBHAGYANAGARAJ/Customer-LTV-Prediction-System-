import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.cohort import build_retention_table, population_period_over_period_retention


def make_txn(cid, cohort, acq, order_date, amount=10.0):
    return {"customer_id": cid, "cohort": cohort, "acquisition_date": acq, "order_date": order_date, "order_amount": amount}


def test_full_retention_all_customers_reorder_every_period():
    txns = []
    for cid in range(1, 5):
        txns.append(make_txn(cid, "2026-01", "2026-01-01", "2026-01-01"))
        txns.append(make_txn(cid, "2026-01", "2026-01-01", "2026-01-25"))  # period 0
        txns.append(make_txn(cid, "2026-01", "2026-01-01", "2026-02-20"))  # period 1
    table = build_retention_table(txns, as_of_date="2026-03-05", max_periods=2)
    assert table["2026-01"]["size"] == 4
    assert table["2026-01"]["retention"][0]["pct_active"] == 100.0
    assert table["2026-01"]["retention"][1]["pct_active"] == 100.0


def test_partial_churn_in_period_one():
    txns = []
    for cid in range(1, 5):
        txns.append(make_txn(cid, "2026-01", "2026-01-01", "2026-01-01"))
    # only customers 1 and 2 order again in period 1 (day 30-60)
    txns.append(make_txn(1, "2026-01", "2026-01-01", "2026-02-15"))
    txns.append(make_txn(2, "2026-01", "2026-01-01", "2026-02-20"))
    table = build_retention_table(txns, as_of_date="2026-03-05", max_periods=2)
    assert table["2026-01"]["retention"][1]["pct_active"] == 50.0


def test_future_period_excluded_not_counted_as_churn():
    txns = [make_txn(1, "2026-06", "2026-06-15", "2026-06-15")]
    table = build_retention_table(txns, as_of_date="2026-06-20", max_periods=3)
    # period 1 (day 30+) hasn't happened yet for this cohort -> eligible should be 0
    assert table["2026-06"]["retention"][1]["eligible"] == 0
    assert table["2026-06"]["retention"][1]["pct_active"] is None


def test_population_retention_bounded():
    txns = []
    for cid in range(1, 11):
        txns.append(make_txn(cid, "2026-01", "2026-01-01", "2026-01-01"))
        if cid <= 6:
            txns.append(make_txn(cid, "2026-01", "2026-01-01", "2026-02-10"))
        if cid <= 3:
            txns.append(make_txn(cid, "2026-01", "2026-01-01", "2026-03-10"))
    table = build_retention_table(txns, as_of_date="2026-04-15", max_periods=3)
    p = population_period_over_period_retention(table)
    assert 0.0 < p <= 1.0
