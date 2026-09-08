# Customer LTV Prediction System

End-to-end **Customer Lifetime Value (LTV) prediction system** — combining a Snowflake-native ML pipeline (built with Cortex Code, an AI coding agent) with a full-stack retail front end for visualizing customer purchasing behavior.

🔗 **Live demo:** [croma-mart.netlify.app](https://croma-mart.netlify.app/)

---

## 📌 Overview

This project predicts each customer's expected spend over the next 90 days using historical e-commerce transaction data, then surfaces those insights through a retail-style web application. It was built to demonstrate **agentic ML** — using natural language prompts to plan and execute an entire ML workflow, from synthetic data generation to model deployment — inside Snowflake.

## ✨ Features

- Synthetic e-commerce transaction dataset (~500 customers, ~100,000 transactions over 18 months)
- Exploratory data analysis with automated feature recommendations
- Regression models trained and compared: **XGBoost**, **LightGBM**, and **Random Forest**
- Model registered in the **Snowflake Model Registry** with evaluation metrics
- Batch inference for LTV predictions via **Snowflake Warehouse**
- Full-stack retail front end (React, HTML, CSS, JavaScript) for exploring customer purchasing data
- Deployed to AWS / Netlify for live access

## 🏗️ Architecture

```
Synthetic Data Generation → EDA & Feature Engineering → Model Training
        (Cortex Code)          (Cortex Code)          (XGBoost / RF / LightGBM)
                                                              │
                                                              ▼
                                             Snowflake Model Registry
                                                              │
                                                              ▼
                                       Batch Inference (Snowflake Warehouse)
                                                              │
                                                              ▼
                                     React Front End ── AWS / Netlify Hosting
```

## 🧰 Tech Stack

| Layer | Tools |
|---|---|
| Data & ML | Snowflake, Snowflake ML, Cortex Code |
| Models | XGBoost, LightGBM, Random Forest |
| Model Ops | Snowflake Model Registry, Snowflake Warehouse (batch inference) |
| Front End | React, HTML, CSS, JavaScript |
| Hosting | AWS, Netlify |

## 📊 Dataset

Synthetic transaction data generated conversationally with Cortex Code, including:

| Column | Description |
|---|---|
| `CUSTOMER_ID` | Unique customer identifier |
| `TRANSACTION_TIME` | Timestamp of purchase |
| `AMOUNT` | Transaction value (varies by category) |
| `PRODUCT_CATEGORY` | Electronics, Groceries, Apparel, etc. |
| `CHANNEL` | Web, Mobile, or In-store |

~10% of customers are modeled as high-value (frequent buyers with higher average spend).

## 🔬 ML Pipeline

1. **Generate synthetic data** — realistic transactions with varying purchase frequency, category-based pricing, and channel mix
2. **Exploratory Data Analysis** — identify purchase frequency, recency, and spend patterns to inform feature selection
3. **Feature engineering** — per-customer aggregations: `total_transactions`, `avg_amount`, `days_since_last_purchase`, `favorite_category`, `channel_distribution`
4. **Model training** — train and evaluate XGBoost, Random Forest, and LightGBM on an 80/20 train/eval split, comparing RMSE, MAE, and R²
5. **Model registry** — log the best-performing model with metrics to the Snowflake Model Registry
6. **Inference** — run batch predictions for customer 90-day LTV via Snowflake Warehouse, ranked by predicted value

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/SRIKANTHBHAGYANAGARAJ/Customer-LTV-Prediction-System-.git
cd Customer-LTV-Prediction-System-

# Install front-end dependencies
npm install

# Run locally
npm start
```

> ML pipeline steps (data generation, training, registry, inference) are run inside Snowflake via Cortex Code / Snowsight Notebooks. See the `/ml` or `/notebooks` directory (if included) for the underlying SQL/Python.

## 📈 Model Performance

| Model | RMSE | MAE | R² |
|---|---|---|---|
| XGBoost | _add value_ | _add value_ | _add value_ |
| Random Forest | _add value_ | _add value_ | _add value_ |
| LightGBM | _add value_ | _add value_ | _add value_ |

*(Fill in with your actual evaluation metrics from the Snowsight notebook output.)*

## 📁 Project Structure

```
Customer-LTV-Prediction-System/
├── src/               # React front-end source
├── public/            # Static assets
├── notebooks/         # Snowflake ML notebooks (EDA, training, inference)
├── LICENSE
└── README.md
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE).

## 👤 Author

**Srikanth Bhagya Nagaraj**
[GitHub](https://github.com/SRIKANTHBHAGYANAGARAJ) · [Live Demo](https://croma-mart.netlify.app/)
