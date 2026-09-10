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

---
## Screenshots

### Home Page
<img width="1917" height="922" alt="Home page" src="https://github.com/user-attachments/assets/d4b3d53f-63b2-4c9b-a26f-b948f64e6bf6" />


### Sign In Page
<img width="955" height="410" alt="Sign_In_Page" src="https://github.com/user-attachments/assets/02f22780-1e91-4a03-b647-c4e3ba39b53f" />


### Explore Product Section
<img width="957" height="413" alt="Explore Product Section" src="https://github.com/user-attachments/assets/53922b25-54b4-40a4-ac23-a7c6b1297ab5" />


### Filtering Product Based on Category or Price
<img width="932" height="403" alt="Filtering Product Based on Category or Price" src="https://github.com/user-attachments/assets/0a743ee2-4e96-4ecc-8512-eb04691337f9" />

### Add To Cart Page
<img width="625" height="287" alt="Add To Cart Page" src="https://github.com/user-attachments/assets/c43b524f-5ab7-4b3c-a7ac-de969b06db29" />

### Why Choose Croma Mart Section
<img width="1869" height="808" alt="Why Choose Croma Mart Section" src="https://github.com/user-attachments/assets/ee37fc07-58ac-4d58-b82f-1e0c0ff27e00" />

### Contact Us Section
<img width="1126" height="746" alt="Contact Us Section" src="https://github.com/user-attachments/assets/175d1f6c-f77a-4dbf-988d-039b959ad492" />


---

## Features

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

## Tech Stack

- **Frontend:** ReactJS (Vite)
- **State Management:** React Context API
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Icons:** React Icons, Font Awesome
- **Notifications:** React Toastify
- **Storage:** Browser LocalStorage

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
 

---

##  Author

**Srikanth BN**  
Aspiring Developer & React Enthusiast  

 Email: `srikanthbhagyanagaraj@gmail.com`  
🔗
