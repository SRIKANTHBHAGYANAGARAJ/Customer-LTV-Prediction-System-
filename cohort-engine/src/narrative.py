"""
Rule-based (template) natural-language summary generation over segment and
forecast results. No external LLM API is used or required -- this mirrors
the approach used elsewhere in this series (e.g. Day 2's NL-to-SQL) of
keeping the "language" layer deterministic and dependency-free, which keeps
the demo runnable offline with no API key.
"""


def narrate_segment(seg_name, stats, total_forecast_revenue):
    pct_base = stats["pct_of_base"]
    n = stats["num_customers"]
    p_alive = stats["avg_p_alive"] * 100
    rev = stats.get("forecast_revenue_90d")
    rev_pct = (100 * rev / total_forecast_revenue) if (rev and total_forecast_revenue) else None

    lines = [f"{seg_name}: {n} customers ({pct_base}% of the base), averaging {p_alive:.0f}% estimated probability of still being active."]

    if rev is not None and rev_pct is not None:
        lines.append(f"Projected to contribute ${rev:,.0f} ({rev_pct:.0f}% of forecast revenue) over the next horizon.")

    action = {
        "Champions": "Protect this segment with loyalty perks and early access -- they drive disproportionate revenue.",
        "Loyal Customers": "Upsell and cross-sell; they buy often and are close to Champion-level value.",
        "Big Spenders": "High value but lower frequency -- test re-engagement campaigns to increase purchase cadence.",
        "Promising New": "Recently acquired with early signal -- nurture with onboarding and second-purchase incentives.",
        "At Risk": "Elevated churn risk despite moderate value -- prioritize win-back outreach now.",
        "Hibernating": "Low activity and low estimated alive-probability -- deprioritize or use low-cost reactivation only.",
        "Needs Attention": "Doesn't cleanly fit other segments -- review manually or refine RFM thresholds.",
    }.get(seg_name, "Review this segment's RFM profile for a tailored action.")
    lines.append(action)
    return " ".join(lines)


def narrate_run(segment_summary, forecast_summary):
    total_forecast = forecast_summary["mean"]
    ordered = sorted(segment_summary.items(), key=lambda kv: kv[1].get("forecast_revenue_90d") or 0, reverse=True)
    paragraphs = [
        (
            f"Over the next {forecast_summary['horizon_days']} days, total revenue is projected at "
            f"${forecast_summary['mean']:,.0f} (90% interval: ${forecast_summary['p10']:,.0f} - ${forecast_summary['p90']:,.0f}), "
            f"based on {forecast_summary['num_simulations']:,} Monte Carlo simulations."
        )
    ]
    for seg_name, stats in ordered:
        paragraphs.append(narrate_segment(seg_name, stats, total_forecast))
    return paragraphs
