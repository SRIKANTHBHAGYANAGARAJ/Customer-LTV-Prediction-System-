import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import OrderSuccess from "./pages/OrderSuccess";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EndFooter from "./components/EndFooter";

const App = () => {
  return (
    <>
      {/* Common header visible on all pages */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Authentication related pages */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Shown after successful order placement */}
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>

      {/* Sidebar rendered globally for cart and navigation */}
      <Sidebar />

      {/* Footer sections displayed across the site */}
      <Footer />
      <EndFooter />
    </>
  );
};

export default App;
