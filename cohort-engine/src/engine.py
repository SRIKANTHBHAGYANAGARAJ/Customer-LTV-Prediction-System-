"""
Orchestrates one end-to-end run:
  load transactions -> cohort retention -> CLV scoring -> RFM segmentation
  -> Monte Carlo forecast -> narrative generation -> persist to SQLite.
"""
import csv
import yaml

from . import db as dbmod
from .cohort import build_retention_table
from .clv_model import score_customers
from .segments import build_segments, summarize_segments
from .forecast import run_monte_carlo
from .narrative import narrate_segment


def load_transactions(csv_path):
    with open(csv_path, newline="") as f:
        return list(csv.DictReader(f))


def load_config(config_path="config/settings.yaml"):
    with open(config_path) as f:
        return yaml.safe_load(f)


def run(config_path="config/settings.yaml", db_path="clv_engine.db", transactions=None, as_of_date=None):
    cfg = load_config(config_path)
    if transactions is None:
        transactions = load_transactions(cfg["data"]["transactions_csv"])
    if as_of_date is None:
        as_of_date = cfg["data"]["as_of_date"]

    retention_table = build_retention_table(transactions, as_of_date)

    scored_customers, model_meta = score_customers(
        transactions, as_of_date, retention_table,
        min_prior_shape=cfg["model"]["min_prior_shape"],
        min_monetary_shape=cfg["model"]["min_monetary_shape"],
    )

    segment_of, per_customer_rfm = build_segments(scored_customers, quintiles=cfg["segments"]["quintiles"])

    fc_cfg = cfg["forecast"]
    forecast = run_monte_carlo(
        scored_customers,
        horizon_days=fc_cfg["horizon_days"],
        num_simulations=fc_cfg["num_simulations"],
        monetary_dispersion_shape=fc_cfg["monetary_dispersion_shape"],
        seed=fc_cfg["random_seed"],
        segment_of=segment_of,
    )

    segment_summary = summarize_segments(scored_customers, segment_of, forecast["expected_revenue_per_customer"])
    # attach the per-segment MC forecast (richer than the point-estimate sum in summarize_segments)
    if forecast["segment_summary"]:
        for seg, mc in forecast["segment_summary"].items():
            if seg in segment_summary:
                segment_summary[seg]["forecast_revenue_90d"] = round(mc["mean"], 2)
                segment_summary[seg]["forecast_p10"] = round(mc["p10"], 2)
                segment_summary[seg]["forecast_p90"] = round(mc["p90"], 2)

    narratives_by_segment = {
        seg: narrate_segment(seg, stats, forecast["summary"]["mean"])
        for seg, stats in segment_summary.items()
    }

    result = {
        "as_of_date": as_of_date,
        "num_customers": len(scored_customers),
        "num_transactions": len(transactions),
        "retention_table": retention_table,
        "scored_customers": scored_customers,
        "segment_of": segment_of,
        "per_customer_rfm": per_customer_rfm,
        "segment_summary": segment_summary,
        "forecast": forecast,
        "narratives_by_segment": narratives_by_segment,
        "meta": model_meta,
    }

    conn = dbmod.init_db(db_path)
    run_id = dbmod.save_run(conn, result)
    conn.close()
    result["run_id"] = run_id
    return result
