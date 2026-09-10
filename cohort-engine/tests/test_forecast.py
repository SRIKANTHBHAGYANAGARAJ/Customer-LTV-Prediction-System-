import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.forecast import run_monte_carlo


def toy_scored_customers():
    return {
        1: {"p_alive": 1.0, "posterior_daily_purchase_rate": 0.1, "est_monetary_value": 50.0},
        2: {"p_alive": 0.0, "posterior_daily_purchase_rate": 0.1, "est_monetary_value": 50.0},
        3: {"p_alive": 0.5, "posterior_daily_purchase_rate": 0.05, "est_monetary_value": 20.0},
    }


def test_dead_customer_contributes_nothing():
    scored = toy_scored_customers()
    result = run_monte_carlo(scored, horizon_days=30, num_simulations=500, monetary_dispersion_shape=6.0, seed=1)
    assert result["expected_revenue_per_customer"][2] == 0.0


def test_alive_customer_contributes_positive_expected_revenue():
    scored = toy_scored_customers()
    result = run_monte_carlo(scored, horizon_days=30, num_simulations=500, monetary_dispersion_shape=6.0, seed=1)
    assert result["expected_revenue_per_customer"][1] > 0


def test_deterministic_with_fixed_seed():
    scored = toy_scored_customers()
    r1 = run_monte_carlo(scored, horizon_days=30, num_simulations=200, monetary_dispersion_shape=6.0, seed=99)
    r2 = run_monte_carlo(scored, horizon_days=30, num_simulations=200, monetary_dispersion_shape=6.0, seed=99)
    assert r1["summary"]["mean"] == r2["summary"]["mean"]


def test_segment_breakdown_sums_close_to_total():
    scored = toy_scored_customers()
    segment_of = {1: "A", 2: "A", 3: "B"}
    result = run_monte_carlo(scored, horizon_days=30, num_simulations=800, monetary_dispersion_shape=6.0, seed=5, segment_of=segment_of)
    seg_mean_sum = sum(v["mean"] for v in result["segment_summary"].values())
    assert abs(seg_mean_sum - result["summary"]["mean"]) < 1.0
