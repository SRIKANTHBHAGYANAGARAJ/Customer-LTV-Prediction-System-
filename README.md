# Customer LTV Prediction System

End-to-end **Customer Lifetime Value (LTV) prediction system** — a Snowflake-native ML pipeline (built with Cortex Code, an AI coding agent) paired with a full-stack retail front end for visualizing customer purchasing behavior.

🔗 **Live demo:** [croma-mart.netlify.app](https://croma-mart.netlify.app/)
📁 **Repo:** [Customer-LTV-Prediction-System](https://github.com/SRIKANTHBHAGYANAGARAJ/Customer-LTV-Prediction-System-)

---

## 📌 Overview

This project predicts each customer's expected spend over the next 90 days using historical e-commerce transaction data, then surfaces those insights through a retail-style web application. It demonstrates **agentic ML** — using natural language prompts to plan and execute an entire ML workflow, from synthetic data generation to model deployment — entirely inside Snowflake, plus a modern edge-delivered front end to put the predictions in front of real users.

## ✨ Features

- Synthetic e-commerce transaction dataset (~500 customers, ~100,000 transactions over 18 months)
- Exploratory data analysis with automated feature recommendations
- Regression models trained and compared: **XGBoost**, **LightGBM**, and **Random Forest**
- Centralized feature store for consistency across training and inference
- Model registered in the **Snowflake Model Registry** with version control and metrics tracking
- Batch inference for LTV predictions via **Snowflake Warehouse**
- Full-stack retail front end (React, HTML, CSS, JavaScript) — **Croma Mart**
- Edge-delivered hosting on Netlify for zero-latency global access

---

## 🏗️ System Architecture

### The Life of a Prediction — End-to-End ML Odyssey

From raw transaction data in the lake, through natural-language feature engineering with Cortex Code, into a centralized feature store, model training, the Snowflake Model Registry, and scalable batch predictions.

![End-to-end ML pipeline architecture](docs/assets/architecture-ml-odyssey.png)

### Unified ML Workflow

Raw data → training datasets → model registry (XGBoost / Random Forest / LightGBM) → batch inference → targeted LTV predictions, with full data lineage from customer IDs and transaction amounts through to a 90-day predicted spend.

![Unified ML workflow overview](docs/assets/architecture-ml-workflow.png)

### Full-Stack Platform Architecture

The same architectural pattern — predictive intelligence, scalable infrastructure, and a premium user experience — applied across projects. `docs/assets/full-stack-platform-architecture.pdf` walks through this in more depth; key takeaways below.

**Architectural alignment matrix** (comparing a heavier analytical workload against this project's retail front end):

| | Mortgage.io (reference) | Croma Mart (this project) |
|---|---|---|
| Business Objective | Predictive AI & heavy compute | High-speed consumer retail |
| Primary Data Engine | Snowflake Data Platform | Distributed edge APIs |
| Delivery Infrastructure | AWS/EC2 (server-side rendering) | Netlify (edge/static delivery) |
| Optimization Target | Complex analytical precision | Zero-latency time-to-interactive |

**Dynamic request routing (reference pattern):**
1. End users hit the React front end
2. An Application Load Balancer dynamically distributes traffic
3. Cached requests are served instantly from a Redis store
4. Heavier compute is routed to the app server cluster

**Predictive ML pipeline (this project):**

```
Raw Ingestion              Transformation                Inference
ML_LTV_TRANSACTIONS   →    ML_LTV_FEATURE_SET      →     ML_LTV_PREDICTIONS
 CUSTOMER_ID                CUSTOMER_ID                    CUSTOMER_ID
 TRANSACTION_TIME           RECENCY_DAYS                   ACTUAL_SPEND_NEXT_90D
 AMOUNT                     TENURE_DAYS                    PREDICTED_SPEND_NEXT_90D
 PRODUCT_CATEGORY           TXN_COUNT_LIFETIME             SCORED_AT
 CHANNEL                    TXN_COUNT_LAST_90D
                            TXN_COUNT_LAST_180D
                            ACTIVE_MONTHS
                            AVG_DAYS_BETWEEN_PURCHASES
```

Raw transactional data is systematically transformed into feature sets, enabling scalable ML inference directly inside the Snowflake warehouse.

---

## 🧰 Tech Stack

| Layer | Tools |
|---|---|
| Data & ML | Snowflake, Snowflake ML, Cortex Code |
| Models | XGBoost, LightGBM, Random Forest |
| Model Ops | Snowflake Model Registry, Snowflake Warehouse (batch inference) |
| Front End | React, HTML, CSS, JavaScript |
| Hosting | AWS, Netlify (edge delivery) |

## 📊 Dataset

Synthetic transaction data generated conversationally with Cortex Code:

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
3. **Feature engineering (natural language, via Cortex Code)** — per-customer aggregations: `RECENCY_DAYS`, `TENURE_DAYS`, `TXN_COUNT_LIFETIME`, `TXN_COUNT_LAST_90D`, `TXN_COUNT_LAST_180D`, `ACTIVE_MONTHS`, `AVG_DAYS_BETWEEN_PURCHASES`
4. **Model training** — train and evaluate XGBoost, Random Forest, and LightGBM on an 80/20 train/eval split, comparing RMSE, MAE, and R²
5. **Model registry** — log the best-performing model with metrics, version control, and deployment info to the Snowflake Model Registry
6. **Inference** — run batch predictions for customer 90-day LTV via Snowflake Warehouse, ranked by predicted value

### Snowflake data lineage (schema explorer)

| Transactions → Feature Set | Feature Set (detail) |
|---|---|
| ![Transactions to feature set](docs/assets/schema-transactions-lineage-1.png) | ![Feature set columns](docs/assets/schema-feature-set.png) |

| Feature Set → Predictions | Predictions (detail) |
|---|---|
| ![Feature set to predictions](docs/assets/schema-transactions-lineage-2.png) | ![Predictions columns](docs/assets/schema-predictions.png) |

---

## 🖥️ Front End — Croma Mart

A retail storefront built to showcase how LTV predictions can drive a real consumer experience: wide product selection, quality assurance, competitive pricing, expert guidance, convenient checkout, and dedicated support.

| Home | Why Choose Us | Contact |
|---|---|---|
| ![Croma Mart home page](docs/assets/screenshot-home.png) | ![Why choose Croma Mart](docs/assets/screenshot-why-choose.png) | ![Contact page with map](docs/assets/screenshot-contact.png) |

🎥 A full walkthrough video of the platform is included at `docs/assets/portfolio-walkthrough.mp4`.

---

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
├── src/                          # React front-end source
├── public/                       # Static assets
├── notebooks/                    # Snowflake ML notebooks (EDA, training, inference)
├── docs/
│   └── assets/                   # Architecture diagrams, screenshots, demo video
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
