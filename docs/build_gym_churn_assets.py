from __future__ import annotations

import json
import shutil
from pathlib import Path

import matplotlib.pyplot as plt
import nbformat as nbf
import numpy as np
import pandas as pd
from nbclient import NotebookClient
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    average_precision_score,
    brier_score_loss,
    precision_score,
    recall_score,
    roc_auc_score,
)
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


ROOT = Path(__file__).resolve().parents[1]
DOWNLOAD_DIR = ROOT / "content" / "downloads" / "gym-churn-prediction"
MEDIA_DIR = ROOT / "content" / "media" / "posts" / "16"
CHART_DIR = DOWNLOAD_DIR / "charts"
SEED = 46


def sigmoid(value: np.ndarray) -> np.ndarray:
    return 1 / (1 + np.exp(-value))


def make_gym_data(rows: int = 12_000, seed: int = SEED) -> pd.DataFrame:
    """Create anonymous member snapshots with realistic relationships, not real people."""
    rng = np.random.default_rng(seed)
    snapshot_months = pd.date_range("2024-01-01", "2025-12-01", freq="MS")
    snapshot_date = rng.choice(snapshot_months, rows)
    tenure_months = np.clip(rng.gamma(2.2, 8.5, rows).astype(int) + 1, 1, 72)
    plan_type = rng.choice(["monthly", "annual", "flex"], rows, p=[0.48, 0.34, 0.18])
    acquisition_channel = rng.choice(
        ["organic", "paid_social", "referral", "walk_in", "corporate"],
        rows,
        p=[0.25, 0.23, 0.20, 0.17, 0.15],
    )
    onboarding_completed = rng.binomial(
        1, np.clip(0.68 + 0.12 * (acquisition_channel == "referral"), 0, 0.95)
    )
    latent_engagement = np.clip(
        rng.beta(2.4, 2.1, rows)
        + 0.10 * onboarding_completed
        + 0.08 * (acquisition_channel == "referral"),
        0,
        1,
    )
    visits_prev_30d = np.clip(
        rng.poisson(1.2 + 8.2 * latent_engagement), 0, 24
    )
    disengaging = rng.binomial(
        1,
        sigmoid(
            -1.55
            + 0.85 * (tenure_months <= 3)
            + 0.45 * (plan_type == "monthly")
            - 0.55 * onboarding_completed
            - 0.65 * latent_engagement
        ),
    )
    visit_drop = disengaging * rng.integers(1, 7, rows)
    visits_30d = np.clip(
        visits_prev_30d + rng.integers(-2, 3, rows) - visit_drop, 0, 24
    )
    visit_change_30d = visits_30d - visits_prev_30d
    days_since_last_visit = np.clip(
        rng.gamma(1.4, 2.0 + 16 / (visits_30d + 1)) + 7 * disengaging,
        0,
        60,
    ).round().astype(int)
    app_sessions_30d = np.clip(
        rng.poisson(0.8 + 5.5 * latent_engagement - 0.5 * disengaging), 0, 25
    )
    classes_booked_30d = np.clip(
        rng.poisson(0.3 + 3.1 * latent_engagement), 0, 12
    )
    cancellation_probability = np.clip(
        0.06 + 0.28 * disengaging + 0.08 * (plan_type == "flex"), 0, 0.75
    )
    classes_cancelled_30d = np.array(
        [
            rng.binomial(booked, probability)
            for booked, probability in zip(
                classes_booked_30d, cancellation_probability, strict=True
            )
        ]
    )
    class_cancel_rate = np.divide(
        classes_cancelled_30d,
        classes_booked_30d,
        out=np.zeros(rows),
        where=classes_booked_30d > 0,
    ).round(3)
    pt_sessions_90d = np.clip(
        rng.poisson(
            0.15
            + 0.9 * onboarding_completed
            + 0.7 * (plan_type == "annual")
            + 0.4 * latent_engagement
        ),
        0,
        8,
    )
    payment_failures_90d = np.clip(
        rng.poisson(0.035 + 0.08 * (plan_type == "monthly")), 0, 2
    )
    referred_friend = rng.binomial(
        1, np.clip(0.04 + 0.16 * latent_engagement, 0, 0.35)
    )
    monthly_fee_eur = np.select(
        [plan_type == "annual", plan_type == "flex"],
        [rng.normal(36, 3, rows), rng.normal(49, 4, rows)],
        default=rng.normal(43, 3.5, rows),
    ).round(2)
    support_tickets_90d = np.clip(
        rng.poisson(0.12 + 0.20 * payment_failures_90d), 0, 4
    )

    churn_logit = (
        -3.55
        + 0.075 * days_since_last_visit
        - 0.12 * visits_30d
        - 0.095 * visit_change_30d
        - 0.065 * app_sessions_30d
        + 0.75 * class_cancel_rate
        + 1.15 * payment_failures_90d
        + 0.40 * support_tickets_90d
        + 0.55 * (tenure_months <= 3)
        + 0.40 * (plan_type == "monthly")
        + 0.18 * (plan_type == "flex")
        - 0.55 * onboarding_completed
        - 0.42 * referred_friend
        - 0.12 * pt_sessions_90d
        + rng.normal(0, 0.55, rows)
    )
    churn_next_30d = rng.binomial(1, sigmoid(churn_logit))

    return (
        pd.DataFrame(
            {
                "member_id": [f"GYM-{number:05d}" for number in range(1, rows + 1)],
                "snapshot_date": pd.to_datetime(snapshot_date),
                "tenure_months": tenure_months,
                "plan_type": plan_type,
                "acquisition_channel": acquisition_channel,
                "monthly_fee_eur": monthly_fee_eur,
                "onboarding_completed": onboarding_completed,
                "visits_prev_30d": visits_prev_30d,
                "visits_30d": visits_30d,
                "visit_change_30d": visit_change_30d,
                "days_since_last_visit": days_since_last_visit,
                "app_sessions_30d": app_sessions_30d,
                "classes_booked_30d": classes_booked_30d,
                "classes_cancelled_30d": classes_cancelled_30d,
                "class_cancel_rate": class_cancel_rate,
                "pt_sessions_90d": pt_sessions_90d,
                "payment_failures_90d": payment_failures_90d,
                "support_tickets_90d": support_tickets_90d,
                "referred_friend": referred_friend,
                "churn_next_30d": churn_next_30d,
            }
        )
        .sort_values(["snapshot_date", "member_id"])
        .reset_index(drop=True)
    )


def top_fraction_metrics(
    y_true: pd.Series, probability: np.ndarray, fraction: float = 0.10
) -> tuple[float, float]:
    cutoff = max(1, int(len(y_true) * fraction))
    selected = np.argsort(probability)[-cutoff:]
    return float(y_true.iloc[selected].mean()), float(y_true.iloc[selected].sum() / y_true.sum())


def train_models(data: pd.DataFrame):
    features = [
        "tenure_months",
        "plan_type",
        "acquisition_channel",
        "monthly_fee_eur",
        "onboarding_completed",
        "visits_prev_30d",
        "visits_30d",
        "visit_change_30d",
        "days_since_last_visit",
        "app_sessions_30d",
        "classes_booked_30d",
        "classes_cancelled_30d",
        "class_cancel_rate",
        "pt_sessions_90d",
        "payment_failures_90d",
        "support_tickets_90d",
        "referred_friend",
    ]
    categorical = ["plan_type", "acquisition_channel"]
    numeric = [column for column in features if column not in categorical]
    train = data[data["snapshot_date"] < "2025-09-01"].copy()
    test = data[data["snapshot_date"] >= "2025-09-01"].copy()
    x_train, y_train = train[features], train["churn_next_30d"]
    x_test, y_test = test[features], test["churn_next_30d"]

    preprocessing = ColumnTransformer(
        [
            (
                "numeric",
                Pipeline(
                    [
                        ("impute", SimpleImputer(strategy="median")),
                        ("scale", StandardScaler()),
                    ]
                ),
                numeric,
            ),
            (
                "categorical",
                OneHotEncoder(handle_unknown="ignore", sparse_output=False),
                categorical,
            ),
        ]
    )
    logistic = Pipeline(
        [
            ("prepare", preprocessing),
            (
                "model",
                LogisticRegression(
                    max_iter=2_000, class_weight="balanced", random_state=SEED
                ),
            ),
        ]
    )
    forest = Pipeline(
        [
            ("prepare", preprocessing),
            (
                "model",
                RandomForestClassifier(
                    n_estimators=250,
                    min_samples_leaf=18,
                    class_weight="balanced_subsample",
                    n_jobs=-1,
                    random_state=SEED,
                ),
            ),
        ]
    )
    models = {"Logistic regression": logistic, "Random forest": forest}
    rows = []
    probabilities = {}
    for name, model in models.items():
        model.fit(x_train, y_train)
        probability = model.predict_proba(x_test)[:, 1]
        probabilities[name] = probability
        precision_10, recall_10 = top_fraction_metrics(y_test, probability)
        rows.append(
            {
                "model": name,
                "roc_auc": roc_auc_score(y_test, probability),
                "pr_auc": average_precision_score(y_test, probability),
                "precision_top_10pct": precision_10,
                "recall_top_10pct": recall_10,
                "brier": brier_score_loss(y_test, probability),
            }
        )

    baseline_prediction = (x_test["days_since_last_visit"] >= 14).astype(int)
    rows.append(
        {
            "model": "Rule: absent 14+ days",
            "roc_auc": roc_auc_score(y_test, baseline_prediction),
            "pr_auc": average_precision_score(y_test, baseline_prediction),
            "precision_top_10pct": precision_score(
                y_test, baseline_prediction, zero_division=0
            ),
            "recall_top_10pct": recall_score(
                y_test, baseline_prediction, zero_division=0
            ),
            "brier": brier_score_loss(y_test, baseline_prediction),
        }
    )
    return (
        pd.DataFrame(rows).set_index("model"),
        models,
        probabilities,
        x_test,
        y_test,
        train,
        test,
    )


def save_charts(
    metrics: pd.DataFrame,
    models,
    probabilities,
    x_test: pd.DataFrame,
    y_test: pd.Series,
    test: pd.DataFrame,
) -> None:
    CHART_DIR.mkdir(parents=True, exist_ok=True)
    plt.style.use("seaborn-v0_8-whitegrid")
    teal = "#0f766e"
    dark = "#17202a"
    orange = "#d97706"

    comparison = metrics.loc[["Logistic regression", "Random forest"]]
    ax = comparison[["roc_auc", "pr_auc", "precision_top_10pct"]].plot(
        kind="bar", figsize=(10, 5.5), color=[dark, orange, teal]
    )
    ax.set_ylim(0, 1)
    ax.set_ylabel("Score")
    ax.set_xlabel("")
    ax.set_title("Model nije dobar zato što kaže 'AI'")
    ax.legend(["ROC-AUC", "PR-AUC", "Precision u top 10%"], frameon=False)
    plt.xticks(rotation=0)
    plt.tight_layout()
    plt.savefig(CHART_DIR / "model-comparison.png", dpi=170)
    plt.close()

    best_name = comparison["precision_top_10pct"].idxmax()
    scored = test[["churn_next_30d"]].copy()
    scored["risk"] = probabilities[best_name]
    scored["risk_decile"] = pd.qcut(
        scored["risk"], 10, labels=range(1, 11), duplicates="drop"
    )
    deciles = scored.groupby("risk_decile", observed=True)["churn_next_30d"].mean()
    ax = (deciles * 100).plot(kind="bar", figsize=(10, 5.5), color=teal)
    ax.set_ylabel("Stvarna churn stopa (%)")
    ax.set_xlabel("Predviđeni risk decil: 1 = najniži, 10 = najviši")
    ax.set_title("Ako model radi, churn raste kroz risk decile")
    plt.xticks(rotation=0)
    plt.tight_layout()
    plt.savefig(CHART_DIR / "risk-deciles.png", dpi=170)
    plt.close()

    attendance = (
        test.assign(
            status=np.where(
                test["churn_next_30d"].eq(1), "Otkazali", "Ostali"
            )
        )
        .groupby("status")[["visits_prev_30d", "visits_30d"]]
        .mean()
        .rename(
            columns={
                "visits_prev_30d": "Prethodnih 30 dana",
                "visits_30d": "Zadnjih 30 dana",
            }
        )
    )
    ax = attendance.plot(
        kind="bar", figsize=(9, 5.5), color=[dark, teal], rot=0
    )
    ax.set_ylabel("Prosječan broj dolazaka")
    ax.set_xlabel("")
    ax.set_title("Pad dolazaka je signal. Nije proročanstvo.")
    ax.legend(frameon=False)
    plt.tight_layout()
    plt.savefig(CHART_DIR / "attendance-drop.png", dpi=170)
    plt.close()

    logistic = models["Logistic regression"]
    feature_names = logistic.named_steps["prepare"].get_feature_names_out()
    coefficients = pd.Series(
        logistic.named_steps["model"].coef_[0], index=feature_names
    )
    strongest = coefficients.loc[coefficients.abs().nlargest(12).index].sort_values()
    labels = [
        label.replace("numeric__", "")
        .replace("categorical__", "")
        .replace("_", " ")
        for label in strongest.index
    ]
    colors = [teal if value < 0 else orange for value in strongest]
    fig, ax = plt.subplots(figsize=(10, 6.5))
    ax.barh(labels, strongest, color=colors)
    ax.axvline(0, color=dark, linewidth=1)
    ax.set_xlabel("Standardizirani koeficijent: lijevo smanjuje, desno povećava rizik")
    ax.set_title("Najjači signali u objašnjivom modelu")
    plt.tight_layout()
    plt.savefig(CHART_DIR / "top-signals.png", dpi=170)
    plt.close()


def make_notebook() -> nbf.NotebookNode:
    notebook = nbf.v4.new_notebook()
    notebook["metadata"]["kernelspec"] = {
        "display_name": "Python 3",
        "language": "python",
        "name": "python3",
    }
    notebook["metadata"]["language_info"] = {"name": "python", "version": "3"}
    source = Path(__file__).read_text(encoding="utf-8")
    generator_start = source.index("def sigmoid")
    generator_end = source.index("\ndef top_fraction_metrics")
    generator_code = source[generator_start:generator_end]
    notebook["cells"] = [
        nbf.v4.new_markdown_cell(
            """# Predviđanje otkazivanja članstva u teretani

Reproducibilan eksperiment uz članak na [peremin.com](https://www.peremin.com/).

**Važno:** podaci su sintetički. Ne predstavljaju stvarne članove, stvarnu teretanu ni dokaz da će isti model raditi na tuđim podacima. Generator samo stvara uvjerljive odnose kako bismo demonstrirali ispravan analitički postupak bez objave osobnih podataka.

Notebook koristi vremenski split, uspoređuje jednostavno poslovno pravilo s dva modela i mjeri ono što je operativno korisno: koliko je stvarnih budućih odlazaka među 10% članova s najvećim rizikom."""
        ),
        nbf.v4.new_code_cell(
            """from pathlib import Path
import json
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    average_precision_score, brier_score_loss, precision_score,
    recall_score, roc_auc_score
)
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

SEED = 46
DATA_PATH = Path("gym_members_churn_synthetic.csv")
CHART_DIR = Path("charts")
CHART_DIR.mkdir(exist_ok=True)
plt.style.use("seaborn-v0_8-whitegrid")"""
        ),
        nbf.v4.new_markdown_cell(
            """## 1. Generiranje podataka

Generator namjerno ugrađuje obrasce koje je razumno očekivati u subscription poslu: pad posjeta, dulju neaktivnost, probleme s plaćanjem, neodrađen onboarding i učestala otkazivanja rezervacija. Tu nema čarolije — cilj je dobiti kontrolirani poligon za postupak, a ne fabricirati tržišnu istinu."""
        ),
        nbf.v4.new_code_cell(
            generator_code
            + '\n\ndata = make_gym_data()\ndata.to_csv(DATA_PATH, index=False)\nprint(f"Redaka: {len(data):,}")\nprint(f"Churn stopa: {data.churn_next_30d.mean():.1%}")\ndata.head()'
        ),
        nbf.v4.new_code_cell(
            """assert data["member_id"].is_unique
assert data["churn_next_30d"].isin([0, 1]).all()
assert data.isna().sum().sum() == 0
assert data["snapshot_date"].min() == pd.Timestamp("2024-01-01")
assert data["snapshot_date"].max() == pd.Timestamp("2025-12-01")
print("Sanity check prošao.")"""
        ),
        nbf.v4.new_markdown_cell(
            """## 2. Vremenski split, bez gledanja u budućnost

Treniramo na snapshotima do kolovoza 2025., a testiramo na zadnja četiri mjeseca. Random split bi dao ljepši broj i slabiju priču: u stvarnosti uvijek predviđamo budućnost iz prošlosti."""
        ),
        nbf.v4.new_code_cell(
            """FEATURES = [
    "tenure_months", "plan_type", "acquisition_channel", "monthly_fee_eur",
    "onboarding_completed", "visits_prev_30d", "visits_30d",
    "visit_change_30d", "days_since_last_visit", "app_sessions_30d",
    "classes_booked_30d", "classes_cancelled_30d", "class_cancel_rate",
    "pt_sessions_90d", "payment_failures_90d", "support_tickets_90d",
    "referred_friend"
]
CATEGORICAL = ["plan_type", "acquisition_channel"]
NUMERIC = [column for column in FEATURES if column not in CATEGORICAL]

train = data[data["snapshot_date"] < "2025-09-01"].copy()
test = data[data["snapshot_date"] >= "2025-09-01"].copy()
X_train, y_train = train[FEATURES], train["churn_next_30d"]
X_test, y_test = test[FEATURES], test["churn_next_30d"]

print(f"Train: {len(train):,} | Test: {len(test):,}")
print(f"Train churn: {y_train.mean():.1%} | Test churn: {y_test.mean():.1%}")"""
        ),
        nbf.v4.new_markdown_cell(
            """## 3. Pravilo prije modela

Ako osoba nije došla 14 dana, označi je rizičnom. To je banalno, jeftino i potpuno legitimno. Model mora pobijediti nešto što bi pametan voditelj teretane mogao složiti u Excelu prije prve kave."""
        ),
        nbf.v4.new_code_cell(
            """baseline = (X_test["days_since_last_visit"] >= 14).astype(int)
baseline_metrics = {
    "roc_auc": roc_auc_score(y_test, baseline),
    "pr_auc": average_precision_score(y_test, baseline),
    "precision": precision_score(y_test, baseline, zero_division=0),
    "recall": recall_score(y_test, baseline, zero_division=0),
}
pd.Series(baseline_metrics).round(3)"""
        ),
        nbf.v4.new_markdown_cell("## 4. Dva modela, bez zoološkog vrta algoritama"),
        nbf.v4.new_code_cell(
            """prepare = ColumnTransformer([
    ("numeric", Pipeline([
        ("impute", SimpleImputer(strategy="median")),
        ("scale", StandardScaler()),
    ]), NUMERIC),
    ("categorical", OneHotEncoder(handle_unknown="ignore", sparse_output=False), CATEGORICAL),
])

models = {
    "Logistic regression": Pipeline([
        ("prepare", prepare),
        ("model", LogisticRegression(max_iter=2000, class_weight="balanced", random_state=SEED)),
    ]),
    "Random forest": Pipeline([
        ("prepare", prepare),
        ("model", RandomForestClassifier(
            n_estimators=250, min_samples_leaf=18,
            class_weight="balanced_subsample", n_jobs=-1, random_state=SEED
        )),
    ]),
}"""
        ),
        nbf.v4.new_code_cell(
            """def top_fraction_metrics(y_true, probability, fraction=0.10):
    cutoff = max(1, int(len(y_true) * fraction))
    selected = np.argsort(probability)[-cutoff:]
    precision = y_true.iloc[selected].mean()
    recall = y_true.iloc[selected].sum() / y_true.sum()
    return float(precision), float(recall)

rows, probabilities = [], {}
for name, model in models.items():
    model.fit(X_train, y_train)
    probability = model.predict_proba(X_test)[:, 1]
    probabilities[name] = probability
    precision_10, recall_10 = top_fraction_metrics(y_test, probability)
    rows.append({
        "model": name,
        "roc_auc": roc_auc_score(y_test, probability),
        "pr_auc": average_precision_score(y_test, probability),
        "precision_top_10pct": precision_10,
        "recall_top_10pct": recall_10,
        "brier": brier_score_loss(y_test, probability),
    })

metrics = pd.DataFrame(rows).set_index("model")
metrics.round(3)"""
        ),
        nbf.v4.new_markdown_cell(
            """## 5. Risk decili i signali

Dobar ranking mora pokazati sve veću stvarnu churn stopu kako idemo od najnižeg prema najvišem risk decilu. Koeficijenti logističke regresije daju nam i smjer signala. To nije kauzalno objašnjenje, ali je bolji početak od slijepog dashboarda."""
        ),
        nbf.v4.new_code_cell(
            """best_name = metrics["precision_top_10pct"].idxmax()
scored = test[["member_id", "churn_next_30d"]].copy()
scored["risk"] = probabilities[best_name]
scored["risk_decile"] = pd.qcut(scored["risk"], 10, labels=range(1, 11))
deciles = scored.groupby("risk_decile", observed=True)["churn_next_30d"].mean()
(deciles * 100).round(1).rename("churn_rate_pct").to_frame()"""
        ),
        nbf.v4.new_code_cell(
            """ax = (deciles * 100).plot(kind="bar", figsize=(10, 5.5), color="#0f766e")
ax.set_ylabel("Stvarna churn stopa (%)")
ax.set_xlabel("Risk decil: 1 = najniži, 10 = najviši")
ax.set_title("Churn kroz predviđene risk decile")
plt.xticks(rotation=0)
plt.tight_layout()
plt.savefig(CHART_DIR / "risk-deciles.png", dpi=170)
plt.show()"""
        ),
        nbf.v4.new_code_cell(
            """logistic = models["Logistic regression"]
feature_names = logistic.named_steps["prepare"].get_feature_names_out()
coefficients = pd.Series(
    logistic.named_steps["model"].coef_[0], index=feature_names
)
strongest = coefficients.loc[coefficients.abs().nlargest(12).index].sort_values()
strongest.rename(lambda x: x.replace("numeric__", "").replace("categorical__", "").replace("_", " ")).round(3)"""
        ),
        nbf.v4.new_markdown_cell(
            """## 6. Poslovni scenarij, ne obećanje

Pretpostavimo da teretana kontaktira 10% najrizičnijih članova. Donji izračun **ne dokazuje** da će poruka ili ponuda nekoga zadržati. Samo pokazuje koliku bi ekonomsku vrijednost imao eksperiment uz zadane pretpostavke. Učinak intervencije mora se izmjeriti randomiziranim holdoutom."""
        ),
        nbf.v4.new_code_cell(
            """precision_10 = metrics.loc[best_name, "precision_top_10pct"]
members_scored = 1_000
members_contacted = int(members_scored * 0.10)
expected_true_churners = members_contacted * precision_10
assumed_save_rate = 0.20
saved_members = expected_true_churners * assumed_save_rate
contribution_margin_monthly = 33
months_retained = 6
contact_cost = 8

scenario = pd.Series({
    "Kontaktirani članovi": members_contacted,
    "Očekivani stvarni churneri u grupi": expected_true_churners,
    "Spašeni članovi uz pretpostavljenih 20%": saved_members,
    "Bruto vrijednost zadržavanja (€)": saved_members * contribution_margin_monthly * months_retained,
    "Trošak intervencije (€)": members_contacted * contact_cost,
    "Neto vrijednost prije fiksnih troškova (€)": (
        saved_members * contribution_margin_monthly * months_retained
        - members_contacted * contact_cost
    ),
})
scenario.round(1).to_frame("vrijednost")"""
        ),
        nbf.v4.new_markdown_cell(
            """## Zaključak

- Churn model služi za prioritizaciju, ne za automatsko dijeljenje popusta.
- Vremenski split je obavezan.
- Precision među članovima koje stvarno možemo kontaktirati važniji je od gole accuracy metrike.
- Visok rizik ne znači da je osoba uvjerljiva. Za to trebaju eksperiment i uplift model.
- Sintetički rezultat je demonstracija pipelinea. Prava odluka počinje tek na stvarnim, zakonito prikupljenim podacima."""
        ),
    ]
    return notebook


def main() -> None:
    DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)
    MEDIA_DIR.mkdir(parents=True, exist_ok=True)
    data = make_gym_data()
    assert data["member_id"].is_unique
    assert data.isna().sum().sum() == 0
    assert 0.02 < data["churn_next_30d"].mean() < 0.08
    data.to_csv(DOWNLOAD_DIR / "gym_members_churn_synthetic.csv", index=False)
    results = train_models(data)
    metrics, models, probabilities, x_test, y_test, train, test = results
    assert metrics.loc["Logistic regression", "roc_auc"] > 0.75
    assert (
        metrics.loc["Logistic regression", "precision_top_10pct"]
        > metrics.loc["Rule: absent 14+ days", "precision_top_10pct"]
    )
    save_charts(metrics, models, probabilities, x_test, y_test, test)

    notebook_path = DOWNLOAD_DIR / "gym_churn_prediction.ipynb"
    notebook = make_notebook()
    nbf.write(notebook, notebook_path)
    executed = NotebookClient(
        notebook,
        timeout=600,
        kernel_name="python3",
        resources={"metadata": {"path": str(DOWNLOAD_DIR)}},
    ).execute()
    nbf.write(executed, notebook_path)

    for chart in CHART_DIR.glob("*.png"):
        shutil.copy2(chart, MEDIA_DIR / chart.name)

    summary = {
        "rows": len(data),
        "churn_rate": round(float(data["churn_next_30d"].mean()), 4),
        "train_rows": len(train),
        "test_rows": len(test),
        "test_churn_rate": round(float(y_test.mean()), 4),
        "metrics": json.loads(metrics.round(4).to_json(orient="index")),
    }
    (DOWNLOAD_DIR / "results.json").write_text(
        json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(json.dumps(summary, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
