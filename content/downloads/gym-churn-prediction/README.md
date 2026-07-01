# Gym churn prediction

Reproducible files for the peremin.com article:

- `gym_members_churn_synthetic.csv` — 12,000 anonymous synthetic member snapshots
- `gym_churn_prediction.ipynb` — executed Python notebook
- `results.json` — machine-readable summary of the executed experiment
- `charts/` — charts generated from the notebook data

The data are synthetic and must not be presented as observations from a real gym.
They are intended for education, prototyping and pipeline testing.

Rebuild from the repository root:

```powershell
python docs/build_gym_churn_assets.py
```
