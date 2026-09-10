import os
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # run from project root so relative paths in settings.yaml resolve

from src import engine as engine_mod
from src import db as dbmod


def test_end_to_end_run_persists_and_returns_consistent_data():
    with tempfile.TemporaryDirectory() as tmp:
        db_path = os.path.join(tmp, "test.db")
        result = engine_mod.run(db_path=db_path)

        assert result["num_customers"] > 0
        assert result["num_transactions"] > 0
        assert result["forecast"]["summary"]["mean"] >= 0
        assert set(result["segment_of"].values()) == set(result["segment_summary"].keys())

        conn = dbmod.get_conn(db_path)
        runs = dbmod.list_runs(conn)
        assert len(runs) == 1
        assert runs[0]["num_customers"] == result["num_customers"]

        segs = dbmod.get_segment_summary(conn, result["run_id"])
        assert len(segs) == len(result["segment_summary"])

        retention = dbmod.get_cohort_retention(conn, result["run_id"])
        assert len(retention) > 0
        conn.close()


def test_two_runs_accumulate_history():
    with tempfile.TemporaryDirectory() as tmp:
        db_path = os.path.join(tmp, "test.db")
        r1 = engine_mod.run(db_path=db_path)
        r2 = engine_mod.run(db_path=db_path)
        assert r2["run_id"] == r1["run_id"] + 1
        conn = dbmod.get_conn(db_path)
        assert len(dbmod.list_runs(conn, limit=10)) == 2
        conn.close()
