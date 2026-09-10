#!/usr/bin/env python3
"""Command-line interface for the CLV & Cohort Retention Analytics Engine."""
import argparse
import json
import sys

from src import db as dbmod
from src import engine as engine_mod
from src.scheduler import run_scheduler


def cmd_compute(args):
    result = engine_mod.run(config_path=args.config, db_path=args.db)
    fc = result["forecast"]["summary"]
    print(f"Run #{result['run_id']} complete: {result['num_customers']} customers, "
          f"{result['num_transactions']} transactions, as_of {result['as_of_date']}")
    print(f"Forecast ({fc['horizon_days']}d): mean=${fc['mean']:,.0f}  "
          f"p10=${fc['p10']:,.0f}  p90=${fc['p90']:,.0f}")
    print("\nSegments:")
    for seg, stats in sorted(result["segment_summary"].items(), key=lambda kv: -(kv[1].get("forecast_revenue_90d") or 0)):
        print(f"  {seg:<18} n={stats['num_customers']:<4} "
              f"({stats['pct_of_base']}%)  forecast_90d=${stats.get('forecast_revenue_90d', 0):,.0f}")


def cmd_list_runs(args):
    conn = dbmod.get_conn(args.db)
    for r in dbmod.list_runs(conn, args.limit):
        print(f"#{r['id']:<4} {r['started_at']:<26} customers={r['num_customers']:<5} "
              f"forecast_mean=${r['forecast_mean']:,.0f}")


def cmd_show_run(args):
    conn = dbmod.get_conn(args.db)
    run = dbmod.get_run(conn, args.run_id)
    if not run:
        print(f"No run #{args.run_id}", file=sys.stderr)
        sys.exit(1)
    print(json.dumps(run, indent=2, default=str))
    print("\nSegments:")
    for s in dbmod.get_segment_summary(conn, args.run_id):
        print(f"  {s['segment']:<18} n={s['num_customers']:<4} forecast=${s['forecast_revenue']:,.0f}")
        print(f"    {s['narrative']}")


def cmd_list_segments(args):
    conn = dbmod.get_conn(args.db)
    for s in dbmod.get_segment_summary(conn, args.run_id):
        print(f"{s['segment']:<18} n={s['num_customers']:<4} pct={s['pct_of_base']}% "
              f"avg_p_alive={s['avg_p_alive']} forecast=${s['forecast_revenue']:,.0f}")


def cmd_show_segment(args):
    conn = dbmod.get_conn(args.db)
    customers = dbmod.get_customer_scores(conn, args.run_id, segment=args.segment)
    if not customers:
        print("No customers found for that run/segment.", file=sys.stderr)
        sys.exit(1)
    for c in customers[: args.limit]:
        print(f"  customer_id={c['customer_id']:<5} cohort={c['cohort']:<8} "
              f"orders={c['num_orders']:<3} p_alive={c['p_alive']:<6} "
              f"value=${c['est_monetary_value']:<8} expected_rev=${c['expected_revenue']}")


def cmd_run_scheduler(args):
    completed = run_scheduler(args.interval, cycles=args.cycles, config_path=args.config, db_path=args.db)
    print(f"Scheduler completed {completed} cycle(s).")


def main():
    p = argparse.ArgumentParser(description="CLV & Cohort Retention Analytics Engine")
    p.add_argument("--config", default="config/settings.yaml")
    p.add_argument("--db", default="clv_engine.db")
    sub = p.add_subparsers(dest="command", required=True)

    sub.add_parser("compute", help="run the full pipeline once").set_defaults(func=cmd_compute)

    lr = sub.add_parser("list-runs", help="list recent runs")
    lr.add_argument("--limit", type=int, default=20)
    lr.set_defaults(func=cmd_list_runs)

    sr = sub.add_parser("show-run", help="show details for one run")
    sr.add_argument("run_id", type=int)
    sr.set_defaults(func=cmd_show_run)

    ls = sub.add_parser("list-segments", help="list segment summary for a run")
    ls.add_argument("run_id", type=int)
    ls.set_defaults(func=cmd_list_segments)

    ss = sub.add_parser("show-segment", help="list customers in one segment for a run")
    ss.add_argument("run_id", type=int)
    ss.add_argument("segment")
    ss.add_argument("--limit", type=int, default=20)
    ss.set_defaults(func=cmd_show_segment)

    rs = sub.add_parser("run-scheduler", help="run the periodic recompute loop")
    rs.add_argument("--interval", type=float, default=21600)
    rs.add_argument("--cycles", type=int, default=None, help="omit to run forever")
    rs.set_defaults(func=cmd_run_scheduler)

    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
