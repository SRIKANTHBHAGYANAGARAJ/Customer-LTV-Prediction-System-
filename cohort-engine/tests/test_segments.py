import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.segments import build_segments, summarize_segments, assign_segment


def toy_scored_customers():
    # 10 customers with varying recency/frequency/monetary to exercise all quintiles
    out = {}
    for i in range(1, 11):
        out[i] = {
            "days_since_last_order": i * 10,       # 10..100 (lower = better recency)
            "num_orders": 11 - i,                   # 10..1 (higher = better frequency)
            "est_monetary_value": i * 15.0,          # 15..150 (higher = better monetary)
            "p_alive": max(0.05, 1.0 - i * 0.08),
            "total_spend": i * 30.0,
        }
    return out


def test_build_segments_assigns_every_customer():
    scored = toy_scored_customers()
    segment_of, rfm = build_segments(scored)
    assert len(segment_of) == len(scored)
    assert all(seg for seg in segment_of.values())


def test_best_customer_is_high_value_segment():
    scored = toy_scored_customers()
    # customer 1: best recency (10), but worst frequency(10... wait check) -- construct explicit best case
    scored[1] = {"days_since_last_order": 1, "num_orders": 20, "est_monetary_value": 500.0}
    segment_of, rfm = build_segments(scored)
    assert rfm[1]["r_score"] == 5
    assert rfm[1]["f_score"] == 5
    assert rfm[1]["m_score"] == 5
    assert segment_of[1] == "Champions"


def test_assign_segment_rule_priority():
    assert assign_segment(5, 5, 5) == "Champions"
    assert assign_segment(1, 1, 1) == "Hibernating"


def test_summarize_segments_percentages_sum_to_100():
    scored = toy_scored_customers()
    segment_of, _ = build_segments(scored)
    summary = summarize_segments(scored, segment_of)
    total_pct = sum(s["pct_of_base"] for s in summary.values())
    assert abs(total_pct - 100.0) < 1.0
