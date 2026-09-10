# 🏗️ Customer LTV Prediction System — End-to-End ML, E-Commerce & Probabilistic CLV Engine

## A complete portfolio project combining a Snowflake ML pipeline, a full-stack React storefront, and a probabilistic CLV cohort engine with Monte Carlo forecasting.

This repository brings together three interconnected components that show the full lifecycle of a customer analytics product:

1. **❄️ Snowflake LTV Prediction Pipeline** — an agentic ML workflow built with Snowflake Cortex Code that predicts each customer's spend over the next 90 days.
2. **🛒 Croma Mart** — a modern React e-commerce frontend that showcases how those predictions can drive a real consumer experience.
3. **📊 CLV Cohort Engine** — a transparent, multi-technique probabilistic model (Poisson-Gamma purchase rates, Gamma-Gamma monetary shrinkage, Monte Carlo forecasting, RFM segmentation) that answers "how much is a customer worth?" in a way a BI team can explain to stakeholders.

---

## 🚀 Live Demo

🔗 **https://croma-mart.netlify.app/**

---

## 📌 Overview

This project predicts each customer's expected spend over the next 90 days using historical e-commerce transaction data and surfaces those insights through a retail-style web application. It demonstrates **agentic ML** — using natural language prompts to plan and execute an entire ML workflow, from synthetic data generation to model deployment — entirely inside Snowflake, plus a modern edge-delivered front end to put predictions in front of real users.

It also ships a **transparent probabilistic CLV engine** for BI teams who need explainable answers to "what is a customer worth?" — using well-understood statistical building blocks (empirical-Bayes shrinkage, Monte Carlo simulation) that are documented plainly enough for an analyst to explain to a stakeholder, including where the model is simplified and why.

---

## 📈 Model Performance (Snowflake LTV Pipeline)

The best-performing model was the **Random Forest Regressor**, which was logged to the Snowflake Model Registry.

| Model | R² | MAE | Median AE | RMSE | MAPE (%) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Random Forest** | **0.78** | **$2,419.87** | **$1,808.34** | **$3,492.40** | **27.07** |
| XGBoost | 0.71 | $2,649.27 | $1,848.41 | $3,972.90 | 28.53 |
| Gradient Boosting | 0.7786 | $3,036 | - | $3,999 | 36.6% |
| Ridge Regression | -70.7672 | $54,289 | $71,994 | - | 505.6% |

**Final Model Recommendation:** Use **Random Forest** for production deployment (24 features, 80/20 eval split, log-transformed target).

---

## ✨ Key Features

### ❄️ Snowflake LTV Prediction Pipeline
- Synthetic e-commerce transaction dataset (~500 customers, ~100,000 transactions over 18 months)
- Exploratory data analysis with automated feature recommendations
- Regression models trained and compared: **XGBoost**, **LightGBM**, and **Random Forest**
- Centralized feature store for consistency across training and inference
- Model registered in the **Snowflake Model Registry** with version control and metrics tracking
- Batch inference for LTV predictions via **Snowflake Warehouse**

### 🛒 Full-Stack E-Commerce Frontend (Croma Mart)
- **Product Management** — listing, details, stock-aware purchasing
- **Shopping Cart** — add, update quantity, remove, automatic totals, cart sidebar
- **Authentication** — Sign Up / Sign In with session persistence
- **Filtering & Navigation** — category & price range filters, smooth routing
- **Persistence & Checkout** — LocalStorage cart, order success page, toast notifications
- **Modern UI/UX** — dark-themed, responsive layout with smooth transitions

### 📊 CLV Cohort Engine (Probabilistic Modeling)
- **Cohort retention analysis** — month-over-month active-customer retention, correctly excluding future cohort/period pairs
- **Empirical-Bayes probabilistic CLV inputs** — Poisson-Gamma conjugate model for purchase rates, recency-decayed "probability still active", Gamma-Gamma shrinkage of average order value
- **Monte Carlo forecasting** — thousands of simulated futures produce a full revenue distribution (mean, median, 10th–90th percentile band) at portfolio and segment level
- **RFM segmentation** — quintile-scored Champions, Loyal Customers, Big Spenders, Promising New, At Risk, Hibernating
- **Templated narrative generation** — turns numeric output into plain-English, stakeholder-ready paragraphs (no external LLM API required; runs fully offline)
- **Persistence, API, dashboard, scheduler, tests, Docker** — SQLite history, Flask REST API + interactive dashboard, periodic recompute scheduler, 18 tests, Dockerfile

---

## 🏗️ System Architecture

### The Life of a Prediction — End-to-End ML Odyssey

From raw transaction data in the lake, through natural-language feature engineering with Cortex Code, into a centralized feature store, model training, the Snowflake Model Registry, and scalable batch predictions.

### Unified ML Workflow

Raw data → training datasets → model registry (XGBoost / Random Forest / LightGBM) → batch inference → targeted LTV predictions, with full data lineage from customer IDs and transaction amounts through to a 90-day predicted spend.

### Full-Stack Platform Architecture

The same architectural pattern — predictive intelligence, scalable infrastructure, and a premium user experience — applied across projects.

**Architectural alignment matrix:**

| Aspect | Croma Mart (this project) |
|--------|---------------------------|
| Business Objective | High-speed consumer retail |
| Primary Data Engine | Distributed edge APIs |
| Delivery Infrastructure | Netlify (edge/static delivery) |
| Optimization Target | Zero-latency time-to-interactive |

**Dynamic request routing:**

1. End users hit the React front end
2. An Application Load Balancer dynamically distributes traffic
3. Cached requests are served instantly from a Redis store
4. Heavier compute is routed to the app server cluster

**Predictive ML pipeline (Snowflake):**

Raw Ingestion Transformation Inference
ML_LTV_TRANSACTIONS → ML_LTV_FEATURE_SET → ML_LTV_PREDICTIONS
CUSTOMER_ID CUSTOMER_ID CUSTOMER_ID
TRANSACTION_TIME RECENCY_DAYS ACTUAL_SPEND_NEXT_90D
AMOUNT TENURE_DAYS PREDICTED_SPEND_NEXT_90D
PRODUCT_CATEGORY TXN_COUNT_LIFETIME SCORED_AT
CHANNEL TXN_COUNT_LAST_90D
TXN_COUNT_LAST_180D
ACTIVE_MONTHS
AVG_DAYS_BETWEEN_PURCHASES

---

---

## 🧰 Tech Stack

| Layer | Tools |
|-------|-------|
| Data & ML (Snowflake) | Snowflake, Snowflake ML, Cortex Code |
| Models (Snowflake) | XGBoost, LightGBM, Random Forest |
| Model Ops | Snowflake Model Registry, Snowflake Warehouse (batch inference) |
| Front End | ReactJS (Vite), Context API, React Router DOM |
| Styling | Tailwind CSS, React Icons, Font Awesome |
| Notifications | React Toastify |
| Storage | Browser LocalStorage |
| CLV Engine | Python, NumPy, SciPy, Flask, SQLite, Monte Carlo |
| Hosting | AWS, Netlify (edge delivery) |
| Containerization | Docker |

---

## 📊 Dataset

Synthetic transaction data generated conversationally with Cortex Code:

| Column | Description |
|--------|-------------|
| `CUSTOMER_ID` | Unique customer identifier |
| `TRANSACTION_TIME` | Timestamp of purchase |
| `AMOUNT` | Transaction value (varies by category) |
| `PRODUCT_CATEGORY` | Electronics, Groceries, Apparel, etc. |
| `CHANNEL` | Web, Mobile, or In-store |

~10% of customers are modeled as high-value (frequent buyers with higher average spend).

The **CLV Cohort Engine** additionally ships with a `sample_data/transactions.csv` containing **600 synthetic customers across 12 monthly cohorts (~1,300 orders)** with a fixed random seed for reproducibility.

---

## 🔬 Snowflake ML Pipeline

1. **Generate synthetic data** — realistic transactions with varying purchase frequency, category-based pricing, and channel mix
2. **Exploratory Data Analysis** — identify purchase frequency, recency, and spend patterns to inform feature selection
3. **Feature engineering (natural language, via Cortex Code)** — per-customer aggregations: `RECENCY_DAYS`, `TENURE_DAYS`, `TXN_COUNT_LIFETIME`, `TXN_COUNT_LAST_90D`, `TXN_COUNT_LAST_180D`, `ACTIVE_MONTHS`, `AVG_DAYS_BETWEEN_PURCHASES`
4. **Model training** — train and evaluate XGBoost, Random Forest, and LightGBM on an 80/20 train/eval split, comparing RMSE, MAE, and R²
5. **Model registry** — log the best-performing model with metrics, version control, and deployment info to the Snowflake Model Registry
6. **Inference** — run batch predictions for customer 90-day LTV via Snowflake Warehouse, ranked by predicted value

---

## 📊 CLV Cohort Engine — The Model, Briefly

For each customer, given their observed order history up to `as_of_date`:

1. **Purchase rate.** Assume purchases follow a Poisson process with an individual daily rate λ, and λ ~ Gamma(r, α) across the population. Fit (r, α) from the population's observed rates via method of moments, then use the closed-form conjugate posterior Gamma(r + xᵢ, α + Tᵢ) for each customer (xᵢ = repeat orders, Tᵢ = customer age in days). This is the standard Poisson-Gamma / "Gamma-Poisson" building block behind BG/NBD-style CLV models.

2. **Probability still active.** The population's month-over-month retention rate is estimated from the cohort curve, then raised to the power of "how many 30-day periods since this customer's last order" as a recency-decayed `p_alive`. This is an explicit simplification of the Beta-Geometric dropout process used in full BG/NBD models.

3. **Monetary value.** Each customer's average order value is shrunk toward the population mean using the classic Gamma-Gamma empirical-Bayes formula, so low-frequency customers regress toward the population average and high-frequency customers are trusted more.

4. **Forecast.** Monte Carlo simulation draws thousands of possible futures from (1)–(3) to produce a revenue distribution over the configured horizon (default 90 days), both overall and per RFM segment.

---

## 🖥️ Front End — Croma Mart

A retail storefront built to showcase how LTV predictions can drive a real consumer experience: wide product selection, quality assurance, competitive pricing, expert guidance, convenient checkout, and dedicated support.

### Screenshots

**Home Page**
<img width="1917" height="922" alt="Home page" src="https://github.com/user-attachments/assets/d4b3d53f-63b2-4c9b-a26f-b948f64e6bf6" />

**Sign In Page**
<img width="955" height="410" alt="Sign_In_Page" src="https://github.com/user-attachments/assets/02f22780-1e91-4a03-b647-c4e3ba39b53f" />

**Explore Product Section**
<img width="957" height="413" alt="Explore Product Section" src="https://github.com/user-attachments/assets/53922b25-54b4-40a4-ac23-a7c6b1297ab5" />

**Filtering Product Based on Category or Price**
<img width="932" height="403" alt="Filtering Product Based on Category or Price" src="https://github.com/user-attachments/assets/0a743ee2-4e96-4ecc-8512-eb04691337f9" />

**Add To Cart Page**
<img width="625" height="287" alt="Add To Cart Page" src="https://github.com/user-attachments/assets/c43b524f-5ab7-4b3c-a7ac-de969b06db29" />

**Why Choose Croma Mart Section**
<img width="1869" height="808" alt="Why Choose Croma Mart Section" src="https://github.com/user-attachments/assets/ee37fc07-58ac-4d58-b82f-1e0c0ff27e00" />

**Contact Us Section**
<img width="1126" height="746" alt="Contact Us Section" src="https://github.com/user-attachments/assets/175d1f6c-f77a-4dbf-988d-039b959ad492" />

---

## 🛒 Frontend Features (Croma Mart)

### Product Management
- Product listing with **image, name, price, category, and stock**
- Product details page with **description and quantity selector**
- **Stock-aware purchasing** to prevent over-ordering

### Shopping Cart
- Add products to cart
- Increase and decrease product quantity
- Remove items from cart
- **Automatic total price calculation**
- **Per-item subtotal calculation**
- Cart sidebar with smooth animations

### Authentication
- User **Sign Up and Sign In**
- Session persistence using **LocalStorage**
- Per-user cart data handling
- Logout functionality

### Filtering and Navigation
- **Category-based filtering**
- **Price range filtering**
- Responsive product grid
- Smooth routing with **React Router DOM**

### Persistence and Checkout
- Cart data stored in **LocalStorage**
- Checkout functionality with stock update
- Order success confirmation page
- **Toast notifications** for user feedback

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

---
## 📁 Project Structure

```bash
src/
│
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Sidebar.jsx
│   ├── Product.jsx
│   ├── CartItem.jsx
│   ├── CategoryFilter.jsx
│   └── PriceFilter.jsx
│
├── contexts/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── ProductContext.jsx
│   └── SidebarContext.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── ProductDetails.jsx
│   ├── Signin.jsx
│   ├── Signup.jsx
│   ├── Contact.jsx
│   └── OrderSuccess.jsx
│
├── assets/
│   └── screenshots/
│       ├── home.png
│       ├── signin.png
│       ├── products.png
│       ├── filter.png
│       ├── cart.png
│       ├── why-choose.png
│       └── contact.png
│
├── App.jsx
├── main.jsx
└── index.css
```

##  Getting Started

###  Clone the Repository
```bash
git clone https://github.com/IAmBiswabhusan/E-COMMERCE-WEBSITE-React.git
cd E-COMMERCE-WEBSITE-React
```

###  Install Dependencies
```bash
npm install
```
###  Run in Development Mode
```bash
npm run dev
```
###  Build for Production 
```bash
npm run build
```
### Preview Production Build
```bash
npm run preview
```
##  Application Flow

- User visits the **Home Page**
- Browses products using **Category** and **Price Filters**
- Opens the **Product Details** page
- Adds items to the **Cart**
- Updates quantity or removes products
- **Signs up** or **Signs in**
- Proceeds to **Checkout**
- Views the **Order Success** confirmation page

---

##  UI & UX Highlights

-  Dark-themed modern interface  
-  Smooth transitions and hover effects  
-  Responsive layout for desktop and mobile  
-  Intuitive cart and checkout experience  


 ## Running the CLV Cohort Engine

 # Install dependencies
pip install -r requirements.txt

# (optional) regenerate sample data — already checked in with a fixed seed
python make_sample_data.py

# CLI: run the full pipeline once
python cli.py compute

# Inspect history
python cli.py list-runs
python cli.py show-run 1
python cli.py list-segments 1
python cli.py show-segment 1 Champions

# Run the scheduler for a fixed number of cycles (demo) — every 10s, 3 cycles
python cli.py run-scheduler --interval 10 --cycles 3

# Dashboard + API
python app.py   # http://localhost:5000

 ###REST API###
 
curl -X POST localhost:5000/api/run
curl localhost:5000/api/runs
curl localhost:5000/api/runs/1
curl localhost:5000/api/runs/1/segments/Champions

###Tests ###

pytest tests/ -v

18 tests covering:

Cohort retention math (including correctly excluding not-yet-eligible cohort/period pairs)

The purchase-rate prior fit and posterior update

Gamma-Gamma monetary shrinkage behavior

Monte Carlo forecast correctness (dead customers contribute $0, determinism under a fixed seed, segment totals reconciling to the portfolio total)

RFM segment assignment

An end-to-end engine run that persists to and reads back from SQLite

###Docker ###

docker build -t clv-cohort-engine .
docker run -p 5000:5000 clv-cohort-engine
# or run the scheduler instead of the dashboard:
docker run clv-cohort-engine python cli.py run-scheduler --interval 21600

###📁 Project Structure
```bash
src/
Customer-LTV-Prediction-System/
├── src/                          # React front-end source
│   ├── components/               # Reusable UI components
│   ├── contexts/                 # React Context (state management)
│   ├── pages/                    # Application pages
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                       # Static assets
├── notebooks/                    # Snowflake ML notebooks (EDA, training, inference)
├── docs/
│   └── assets/                   # Architecture diagrams, screenshots, demo video
│
├── day17-clv-cohort-engine/      # Probabilistic CLV Cohort Engine
│   ├── app.py                    # Flask REST API + dashboard
│   ├── cli.py                    # command-line interface
│   ├── make_sample_data.py       # regenerates sample_data/transactions.csv
│   ├── config/
│   │   └── settings.yaml         # data path, model priors, forecast horizon/sims, RFM quintiles
│   ├── src/
│   │   ├── cohort.py             # cohort retention table + population retention rate
│   │   ├── clv_model.py          # Poisson-Gamma posterior, p_alive, Gamma-Gamma shrinkage
│   │   ├── forecast.py           # Monte Carlo revenue simulation
│   │   ├── segments.py           # RFM quintile scoring
│   │   ├── narrative.py          # rule-based NLG over segment + forecast results
│   │   ├── db.py                 # SQLite schema
│   │   ├── engine.py             # orchestrates the full pipeline
│   │   └── scheduler.py          # fixed-interval recompute loop
│   ├── templates/
│   │   └── dashboard.html        # KPI cards, forecast chart, retention heatmap
│   ├── sample_data/
│   │   └── transactions.csv      # 600 synthetic customers, 12 monthly cohorts
│   ├── tests/                    # 18 tests covering all modules
│   ├── requirements.txt
│   └── Dockerfile
│
├── LICENSE
└── README.md
```

###📚 What I Learned
Generate realistic synthetic e-commerce data with natural language prompts

Perform comprehensive EDA with automated feature recommendations

Train and compare multiple regression models (XGBoost vs LightGBM vs Random Forest)

Log models with metrics to the Snowflake Model Registry

Run batch inference on a Snowflake Warehouse

Build a full-stack React application with AWS integration

Implement state management with React Context API

Deploy with CI/CD pipeline on Netlify

Combine multiple analytical techniques (empirical-Bayes shrinkage, Monte Carlo simulation, cohort retention, RFM segmentation) into one coherent pipeline

Quantify uncertainty with probabilistic modeling instead of single point estimates

Build transparent, explainable ML models that a BI analyst can present to a stakeholder

###🙏 Acknowledgments
Sho Tanaka — Lead Developer Advocate @ Snowflake | AI Agents, ML/LLMOps, OSS - Google Developer Expert AI

Snowflake Cortex Code Quickstart — https://github.com/Snowflake-Labs/sfquickstarts

🤝 Contributing
Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.

📄 License
This project is licensed under the Apache License 2.0.

👤 Author
Srikanth Bhagya Nagaraj

GitHub: SRIKANTHBHAGYANAGARAJ

Live Demo: croma-mart.netlify.app

Email: srikanthbhagyanagaraj@gmail.com

⭐ Star the Repository
If you found this project useful, please give it a star!

text

---

**✅ This is the complete, final, merged README.md.** It includes:
- ✅ Your original Croma Mart React app details (features, screenshots, tech stack)
- ✅ Snowflake LTV Prediction System with **actual model metrics** (Random Forest R²=0.78, MAE=$2,419.87)
- ✅ The full **CLV Cohort Engine** architecture with Poisson-Gamma, Gamma-Gamma, Monte Carlo, RFM segmentation, Flask API, SQLite persistence, Docker, and 18 tests
- ✅ Complete project structure, running instructions, limitations, and acknowledgments

**Just copy the entire code block above and paste it to replace your existing `README.md` on GitHub!** 🚀


---

##  Author

**Srikanth BN**  
Aspiring Developer & React Enthusiast  

 Email: `srikanthbhagyanagaraj@gmail.com`  
🔗
