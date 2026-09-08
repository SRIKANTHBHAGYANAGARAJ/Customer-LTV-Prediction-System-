# Croma Mart – React E-Commerce Application

Bhusan Mart is a **modern React-based e-commerce web application** that demonstrates real-world shopping cart functionality, global state management, product filtering, authentication flow, and a polished user interface.

The project is built with a focus on **clean architecture, reusable components, and practical business logic**, making it suitable for learning, portfolio showcase, and real-world frontend practice.

---
## Live Demo

**Website:** https://bhusan-mart.vercel.app/  
**GitHub Repository:** [https://github.com/IAmBiswabhusan/E-COMMERCE-WEBSITE-React](https://github.com/SRIKANTHBHAGYANAGARAJ/e-commerce-transaction-Platform.git)

## Screenshots

### Home Page
<img width="1920" height="1020" alt="Screenshot 2025-12-18 161316" src="https://github.com/user-attachments/assets/62aa0fe3-4989-4f8a-ba9b-5980dc8d5c17" />

### Sign In Page

<img width="1920" height="1080" alt="Screenshot (1318)" src="https://github.com/user-attachments/assets/d0a888a4-4455-4ae9-a438-35d202911452" />

### Explore Product Section

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d524bace-5f5e-46ce-a805-b30775640497" />


### Filtering Product Based on Category or Price

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0722f39b-03e8-41bf-afbf-fc91fdedd0cb" />

### Add To Cart Page

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2858d369-7213-4141-a53f-4bdc9ddbe6ae" />


### View Product Details Page

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a8bd1512-24de-452a-b40a-014110d9e000" />


### Why Choose Bhusan Mart Section

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f25261f3-46ed-4257-842c-5d712997132d" />

### Contact Us Section

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/62f713eb-189b-4128-b21a-1e306d87a258" />

### Footer Section 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3bff0f93-559b-49b2-b507-c62e72e956be" />


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
│   └── OrderSuccess.jsx
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

**Biswabhusan Mohapatra**  
Aspiring Developer & React Enthusiast  

 Email: `srikanthbhagyanagaraj@gmail.com`  
🔗 
