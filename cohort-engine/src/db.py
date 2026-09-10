"""SQLite persistence for run history, per-customer scores, segments, and forecasts."""
import json
import sqlite3
from datetime import datetime, timezone

SCHEMA = """
CREATE TABLE IF NOT EXISTS runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    started_at TEXT NOT NULL,
    as_of_date TEXT NOT NULL,
    num_customers INTEGER,
    num_transactions INTEGER,
    horizon_days INTEGER,
    forecast_mean REAL,
    forecast_p10 REAL,
    forecast_p90 REAL,
    meta_json TEXT
);

CREATE TABLE IF NOT EXISTS customer_scores (
    run_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    cohort TEXT,
    num_orders INTEGER,
    p_alive REAL,
    est_monetary_value REAL,
    segment TEXT,
    expected_revenue REAL,
    FOREIGN KEY(run_id) REFERENCES runs(id)
);

CREATE TABLE IF NOT EXISTS segment_summary (
    run_id INTEGER NOT NULL,
    segment TEXT NOT NULL,
    num_customers INTEGER,
    pct_of_base REAL,
    avg_p_alive REAL,
    forecast_revenue REAL,
    narrative TEXT,
    FOREIGN KEY(run_id) REFERENCES runs(id)
);

CREATE TABLE IF NOT EXISTS cohort_retention (
    run_id INTEGER NOT NULL,
    cohort TEXT NOT NULL,
    period INTEGER NOT NULL,
    pct_active REAL,
    eligible INTEGER,
    active INTEGER,
    FOREIGN KEY(run_id) REFERENCES runs(id)
);
"""


def get_conn(db_path="clv_engine.db"):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


def init_db(db_path="clv_engine.db"):
    conn = get_conn(db_path)
    conn.executescript(SCHEMA)
    conn.commit()
    return conn


def save_run(conn, result):
    cur = conn.cursor()
    cur.execute(
        """INSERT INTO runs (started_at, as_of_date, num_customers, num_transactions,
                              horizon_days, forecast_mean, forecast_p10, forecast_p90, meta_json)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            datetime.now(timezone.utc).isoformat(),
            result["as_of_date"],
            result["num_customers"],
            result["num_transactions"],
            result["forecast"]["summary"]["horizon_days"],
            result["forecast"]["summary"]["mean"],
            result["forecast"]["summary"]["p10"],
            result["forecast"]["summary"]["p90"],
            json.dumps(result["meta"]),
        ),
    )
    run_id = cur.lastrowid

    scored = result["scored_customers"]
    segment_of = result["segment_of"]
    expected_rev = result["forecast"]["expected_revenue_per_customer"]
    cust_rows = [
        (
            run_id, cid, scored[cid]["cohort"], scored[cid]["num_orders"],
            scored[cid]["p_alive"], scored[cid]["est_monetary_value"],
            segment_of[cid], expected_rev.get(cid, 0.0),
        )
        for cid in scored
    ]
    cur.executemany(
        """INSERT INTO customer_scores (run_id, customer_id, cohort, num_orders, p_alive,
                                         est_monetary_value, segment, expected_revenue)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
        cust_rows,
    )

    seg_rows = [
        (
            run_id, seg, stats["num_customers"], stats["pct_of_base"], stats["avg_p_alive"],
            stats.get("forecast_revenue_90d"), result["narratives_by_segment"].get(seg, ""),
        )
        for seg, stats in result["segment_summary"].items()
    ]
    cur.executemany(
        """INSERT INTO segment_summary (run_id, segment, num_customers, pct_of_base,
                                         avg_p_alive, forecast_revenue, narrative)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        seg_rows,
    )

    cohort_rows = []
    for cohort, data in result["retention_table"].items():
        for p in data["retention"]:
            if p["pct_active"] is not None:
                cohort_rows.append((run_id, cohort, p["period"], p["pct_active"], p["eligible"], p["active"]))
    cur.executemany(
        """INSERT INTO cohort_retention (run_id, cohort, period, pct_active, eligible, active)
           VALUES (?, ?, ?, ?, ?, ?)""",
        cohort_rows,
    )

    conn.commit()
    return run_id


def list_runs(conn, limit=20):
    cur = conn.execute("SELECT * FROM runs ORDER BY id DESC LIMIT ?", (limit,))
    return [dict(r) for r in cur.fetchall()]


def get_run(conn, run_id):
    cur = conn.execute("SELECT * FROM runs WHERE id = ?", (run_id,))
    row = cur.fetchone()
    return dict(row) if row else None


def get_segment_summary(conn, run_id):
    cur = conn.execute("SELECT * FROM segment_summary WHERE run_id = ? ORDER BY forecast_revenue DESC", (run_id,))
    return [dict(r) for r in cur.fetchall()]


def get_cohort_retention(conn, run_id):
    cur = conn.execute("SELECT * FROM cohort_retention WHERE run_id = ? ORDER BY cohort, period", (run_id,))
    return [dict(r) for r in cur.fetchall()]


def get_customer_scores(conn, run_id, segment=None):
    if segment:
        cur = conn.execute(
            "SELECT * FROM customer_scores WHERE run_id = ? AND segment = ? ORDER BY expected_revenue DESC",
            (run_id, segment),
        )
    else:
        cur = conn.execute("SELECT * FROM customer_scores WHERE run_id = ? ORDER BY expected_revenue DESC", (run_id,))
    return [dict(r) for r in cur.fetchall()]
