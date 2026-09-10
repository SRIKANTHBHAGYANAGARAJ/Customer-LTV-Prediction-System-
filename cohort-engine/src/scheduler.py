"""Fixed-interval recompute loop, mirroring the Day 16 scheduler pattern:
run engine.run() every N seconds, either forever or for a fixed number of
cycles (used for demos/tests so it terminates)."""
import logging
import time

from . import engine as engine_mod

logging.basicConfig(level=logging.INFO, format="%(asctime)s [scheduler] %(message)s")
logger = logging.getLogger("scheduler")


def run_scheduler(interval_seconds, cycles=None, config_path="config/settings.yaml", db_path="clv_engine.db"):
    """cycles=None runs forever; an integer runs exactly that many times then returns."""
    completed = 0
    while cycles is None or completed < cycles:
        result = engine_mod.run(config_path=config_path, db_path=db_path)
        logger.info(
            "run_id=%s customers=%d forecast_mean=$%.0f (p10=$%.0f p90=$%.0f)",
            result["run_id"], result["num_customers"],
            result["forecast"]["summary"]["mean"],
            result["forecast"]["summary"]["p10"],
            result["forecast"]["summary"]["p90"],
        )
        completed += 1
        if cycles is None or completed < cycles:
            time.sleep(interval_seconds)
    return completed
