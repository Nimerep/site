#!/usr/bin/env python3
"""Reproduce the offline ranking experiment used on peremin.com."""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
import pandas as pd


GAINS = {"E": 1.0, "S": 0.1, "C": 0.01, "I": 0.0}
RANDOM_REPEATS = 50
SEED = 20260720


def csv_safe(value: str) -> str:
    """Keep public query text from becoming a spreadsheet formula."""
    return "'" + value if value.startswith(("=", "+", "-", "@")) else value


def ranking_metrics(labels: list[str]) -> tuple[float, float, float, float]:
    top = labels[:10]
    gains = np.array([GAINS[label] for label in top], dtype=float)
    discount = np.log2(np.arange(2, len(top) + 2))
    dcg = float(np.sum(gains / discount))

    ideal = sorted((GAINS[label] for label in labels), reverse=True)[:10]
    ideal_discount = np.log2(np.arange(2, len(ideal) + 2))
    idcg = float(np.sum(np.array(ideal) / ideal_discount))

    exact_positions = [i + 1 for i, label in enumerate(top) if label == "E"]
    exact_total = labels.count("E")
    return (
        dcg / idcg,
        1 / exact_positions[0] if exact_positions else 0.0,
        sum(label == "E" for label in top) / exact_total,
        float(not exact_positions),
    )


def scenario_metrics(labels: list[str], rng: np.random.Generator) -> dict[str, tuple[float, ...]]:
    ideal = sorted(labels, key=GAINS.get, reverse=True)
    one_wrong_first = ideal.copy()
    one_wrong_first.insert(0, one_wrong_first.pop(one_wrong_first.index("I")))
    exact_last = sorted(labels, key={"S": 0, "C": 1, "I": 2, "E": 3}.get)

    random_runs = []
    for _ in range(RANDOM_REPEATS):
        shuffled = labels.copy()
        rng.shuffle(shuffled)
        random_runs.append(ranking_metrics(shuffled))

    return {
        "idealni_redoslijed": ranking_metrics(ideal),
        "jedan_irelevantan_prvi": ranking_metrics(one_wrong_first),
        "nasumicni_redoslijed": tuple(np.mean(random_runs, axis=0)),
        "exact_rezultati_zadnji": ranking_metrics(exact_last),
    }


def bootstrap_ci(values: np.ndarray, rng: np.random.Generator) -> tuple[float, float]:
    means = np.empty(2000)
    for i in range(len(means)):
        means[i] = rng.choice(values, size=len(values), replace=True).mean()
    return tuple(np.quantile(means, [0.025, 0.975]))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("parquet", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    assert ranking_metrics(["E", "S", "C", "I"])[0] == 1.0
    assert ranking_metrics(["I", "C", "S", "E"])[0] < 1.0

    frame = pd.read_parquet(
        args.parquet,
        columns=["query", "query_id", "product_locale", "esci_label", "small_version", "split"],
    )
    frame = frame[
        (frame["small_version"] == 1)
        & (frame["product_locale"] == "us")
        & (frame["split"] == "test")
    ]

    groups = []
    for query_id, group in frame.groupby("query_id", sort=True):
        labels = group["esci_label"].tolist()
        if "E" in labels and "I" in labels:
            groups.append((query_id, group["query"].iloc[0], labels))

    rng = np.random.default_rng(SEED)
    rows = []
    for query_id, query, labels in groups:
        for scenario, metrics in scenario_metrics(labels, rng).items():
            rows.append(
                {
                    "query_id": query_id,
                    "query": csv_safe(query),
                    "candidate_count": len(labels),
                    "exact_count": labels.count("E"),
                    "irrelevant_count": labels.count("I"),
                    "scenario": scenario,
                    "ndcg_at_10": metrics[0],
                    "mrr_at_10": metrics[1],
                    "exact_recall_at_10": metrics[2],
                    "no_exact_at_10": metrics[3],
                }
            )

    results = pd.DataFrame(rows)
    summary_rows = []
    bootstrap_rng = np.random.default_rng(SEED + 1)
    for scenario, group in results.groupby("scenario", sort=False):
        low, high = bootstrap_ci(group["ndcg_at_10"].to_numpy(), bootstrap_rng)
        summary_rows.append(
            {
                "scenario": scenario,
                "queries": len(group),
                "mean_ndcg_at_10": group["ndcg_at_10"].mean(),
                "ndcg_ci_95_low": low,
                "ndcg_ci_95_high": high,
                "mean_mrr_at_10": group["mrr_at_10"].mean(),
                "mean_exact_recall_at_10": group["exact_recall_at_10"].mean(),
                "queries_without_exact_at_10_pct": 100 * group["no_exact_at_10"].mean(),
            }
        )

    args.output.mkdir(parents=True, exist_ok=True)
    results.to_csv(args.output / "esci_query_results.csv", index=False)
    pd.DataFrame(summary_rows).to_csv(args.output / "esci_experiment_summary.csv", index=False)

    print(f"eligible_queries={len(groups)} rows={len(results)} seed={SEED}")
    print(pd.DataFrame(summary_rows).to_string(index=False))


if __name__ == "__main__":
    main()
