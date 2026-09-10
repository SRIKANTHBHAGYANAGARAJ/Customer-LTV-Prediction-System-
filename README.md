# Croma Mart – React E-Commerce Application

Croma Mart is a **modern React-based e-commerce web application** that demonstrates real-world shopping cart functionality, global state management, product filtering, authentication flow, and a polished user interface.

The project is built with a focus on **clean architecture, reusable components, and practical business logic**, making it suitable for learning, portfolio showcase, and real-world frontend practice.

---
## Live Demo

[Add your live demo link here]

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
