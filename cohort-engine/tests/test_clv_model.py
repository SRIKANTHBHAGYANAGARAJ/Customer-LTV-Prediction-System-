import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.clv_model import build_customer_features, fit_population_purchase_prior, fit_population_monetary_prior, score_customers
from src.cohort import build_retention_table


def make_txn(cid, cohort, acq, order_date, amount=10.0):
    return {"customer_id": cid, "cohort": cohort, "acquisition_date": acq, "order_date": order_date, "order_amount": amount}


def sample_transactions():
    txns = []
    # customer 1: heavy repeat buyer, 3 extra orders
    txns += [make_txn(1, "2026-01", "2026-01-01", d, a) for d, a in
              [("2026-01-01", 20), ("2026-01-20", 25), ("2026-02-15", 22), ("2026-03-10", 30)]]
    # customer 2: single order, long ago (should look churned)
    txns += [make_txn(2, "2026-01", "2026-01-01", "2026-01-01", 15)]
    # customer 3: recent single order (new customer, less certain)
    txns += [make_txn(3, "2026-05", "2026-06-01", "2026-06-01", 50)]
    return txns


def test_build_customer_features_basic_counts():
    txns = sample_transactions()
    features = build_customer_features(txns, as_of_date="2026-06-30")
    assert features[1]["num_orders"] == 4
    assert features[1]["x_repeat_orders"] == 3
    assert features[2]["num_orders"] == 1
    assert features[2]["x_repeat_orders"] == 0
    assert features[2]["days_since_last_order"] > features[3]["days_since_last_order"]


def test_purchase_prior_positive():
    features = build_customer_features(sample_transactions(), as_of_date="2026-06-30")
    prior = fit_population_purchase_prior(features)
    assert prior["r"] > 0
    assert prior["alpha"] > 0


def test_monetary_shrinkage_pulls_low_frequency_customers_toward_mean():
    features = build_customer_features(sample_transactions(), as_of_date="2026-06-30")
    prior = fit_population_monetary_prior(features)
    # customer 3 has x=0 repeat orders -> full shrinkage to population mean
    shrunk = (prior["shape"] * prior["mean"] + 0 * features[3]["avg_order_value"]) / (prior["shape"] + 0)
    assert abs(shrunk - prior["mean"]) < 1e-9


def test_score_customers_frequent_buyer_has_higher_p_alive_than_dormant_one():
    txns = sample_transactions()
    retention_table = build_retention_table(txns, as_of_date="2026-06-30")
    scored, meta = score_customers(txns, "2026-06-30", retention_table)
    assert scored[1]["p_alive"] > scored[2]["p_alive"]
    assert scored[1]["est_monetary_value"] > 0
    assert "purchase_prior" in meta
