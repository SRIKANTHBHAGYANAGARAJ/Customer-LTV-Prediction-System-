"""
RFM (Recency, Frequency, Monetary) quintile segmentation over the scored
customers produced by clv_model.score_customers, mapped to named business
segments using the standard RFM rule-of-thumb grid.
"""
import numpy as np


def _quintile_score(values, higher_is_better, quintiles=5):
    """Return an array of 1..quintiles scores (quintiles=best) for each value."""
    values = np.asarray(values, dtype=float)
    ranks = np.argsort(np.argsort(values))  # 0-indexed ascending rank
    n = len(values)
    bucket = np.floor(ranks * quintiles / n).astype(int)
    bucket = np.clip(bucket, 0, quintiles - 1)
    score = bucket + 1  # 1..quintiles, ascending with value
    if not higher_is_better:
        score = quintiles + 1 - score
    return score


SEGMENT_RULES = [
    # (name, min_r, min_f, min_m) all evaluated as "score >= threshold" on 1-5 scale
    ("Champions", 4, 4, 4),
    ("Loyal Customers", 3, 4, 3),
    ("Big Spenders", 2, 2, 4),
    ("Promising New", 4, 1, 1),
    ("At Risk", 1, 3, 3),
    ("Hibernating", 1, 1, 1),
]


def assign_segment(r_score, f_score, m_score):
    for name, min_r, min_f, min_m in SEGMENT_RULES:
        if r_score >= min_r and f_score >= min_f and m_score >= min_m:
            return name
    return "Needs Attention"


def build_segments(scored_customers, quintiles=5):
    ids = list(scored_customers.keys())
    recency = [scored_customers[c]["days_since_last_order"] for c in ids]
    frequency = [scored_customers[c]["num_orders"] for c in ids]
    monetary = [scored_customers[c]["est_monetary_value"] for c in ids]

    r_scores = _quintile_score(recency, higher_is_better=False, quintiles=quintiles)
    f_scores = _quintile_score(frequency, higher_is_better=True, quintiles=quintiles)
    m_scores = _quintile_score(monetary, higher_is_better=True, quintiles=quintiles)

    segment_of = {}
    per_customer_rfm = {}
    for i, cid in enumerate(ids):
        seg = assign_segment(r_scores[i], f_scores[i], m_scores[i])
        segment_of[cid] = seg
        per_customer_rfm[cid] = {
            "r_score": int(r_scores[i]),
            "f_score": int(f_scores[i]),
            "m_score": int(m_scores[i]),
            "segment": seg,
        }

    return segment_of, per_customer_rfm


def summarize_segments(scored_customers, segment_of, forecast_expected_revenue=None):
    from collections import defaultdict
    groups = defaultdict(list)
    for cid, seg in segment_of.items():
        groups[seg].append(cid)

    total_customers = len(segment_of)
    summary = {}
    for seg, ids in groups.items():
        avg_p_alive = sum(scored_customers[c]["p_alive"] for c in ids) / len(ids)
        avg_value = sum(scored_customers[c]["est_monetary_value"] for c in ids) / len(ids)
        historical_spend = sum(scored_customers[c]["total_spend"] for c in ids)
        forecast_rev = None
        if forecast_expected_revenue is not None:
            forecast_rev = round(sum(forecast_expected_revenue.get(c, 0.0) for c in ids), 2)
        summary[seg] = {
            "num_customers": len(ids),
            "pct_of_base": round(100 * len(ids) / total_customers, 1),
            "avg_p_alive": round(avg_p_alive, 3),
            "avg_monetary_value": round(avg_value, 2),
            "historical_spend": round(historical_spend, 2),
            "forecast_revenue_90d": forecast_rev,
        }
    return summary
