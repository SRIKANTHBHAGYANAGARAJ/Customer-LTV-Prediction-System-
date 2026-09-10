#!/usr/bin/env python3
"""Flask REST API + dashboard for the CLV & Cohort Retention Analytics Engine."""
import os

from flask import Flask, jsonify, render_template, request

from src import db as dbmod
from src import engine as engine_mod

app = Flask(__name__)
DB_PATH = os.environ.get("CLV_DB_PATH", "clv_engine.db")
CONFIG_PATH = os.environ.get("CLV_CONFIG_PATH", "config/settings.yaml")


def _ensure_db():
    dbmod.init_db(DB_PATH).close()


@app.route("/")
def dashboard():
    _ensure_db()
    conn = dbmod.get_conn(DB_PATH)
    runs = dbmod.list_runs(conn, limit=10)
    latest = runs[0] if runs else None
    segments, retention, narratives = [], [], []
    if latest:
        segments = dbmod.get_segment_summary(conn, latest["id"])
        retention = dbmod.get_cohort_retention(conn, latest["id"])
    conn.close()
    return render_template("dashboard.html", runs=runs, latest=latest, segments=segments, retention=retention)


@app.route("/api/run", methods=["POST"])
def api_run():
    result = engine_mod.run(config_path=CONFIG_PATH, db_path=DB_PATH)
    return jsonify({
        "run_id": result["run_id"],
        "num_customers": result["num_customers"],
        "num_transactions": result["num_transactions"],
        "forecast_summary": result["forecast"]["summary"],
        "segment_summary": result["segment_summary"],
    })


@app.route("/api/runs")
def api_runs():
    conn = dbmod.get_conn(DB_PATH)
    runs = dbmod.list_runs(conn, limit=int(request.args.get("limit", 20)))
    conn.close()
    return jsonify(runs)


@app.route("/api/runs/<int:run_id>")
def api_run_detail(run_id):
    conn = dbmod.get_conn(DB_PATH)
    run = dbmod.get_run(conn, run_id)
    if not run:
        conn.close()
        return jsonify({"error": "not found"}), 404
    segments = dbmod.get_segment_summary(conn, run_id)
    retention = dbmod.get_cohort_retention(conn, run_id)
    conn.close()
    return jsonify({"run": run, "segments": segments, "retention": retention})


@app.route("/api/runs/<int:run_id>/segments/<segment>")
def api_segment_customers(run_id, segment):
    conn = dbmod.get_conn(DB_PATH)
    customers = dbmod.get_customer_scores(conn, run_id, segment=segment)
    conn.close()
    return jsonify(customers)


if __name__ == "__main__":
    _ensure_db()
    app.run(host="0.0.0.0", port=5000, debug=False)
