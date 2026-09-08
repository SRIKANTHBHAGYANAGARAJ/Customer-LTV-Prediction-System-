import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { ProductContext } from "./ProductContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { reloadProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // Load cart based on logged-in user
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.email}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCart([]);
    }
  }, [user]);

  // Persist cart for current user
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  // Update total price and item count
  useEffect(() => {
    setTotal(cart.reduce((acc, item) => acc + item.price * item.amount, 0));
    setItemAmount(cart.reduce((acc, item) => acc + item.amount, 0));
  }, [cart]);

  const addToCart = (product) => {
    const item = cart.find((i) => i.id === product.id);

    if (item) {
      if (item.amount >= product.stock) {
        toast.warning("Stock limit reached!");
        return;
      }

      setCart(
        cart.map((i) =>
          i.id === product.id ? { ...i, amount: i.amount + 1 } : i,
        ),
      );

      toast.success("Item quantity increased");
    } else {
      setCart([...cart, { ...product, amount: 1 }]);
      toast.success("Item added to cart");
    }
  };

  const addToCartWithQty = (product, qty) => {
    const item = cart.find((i) => i.id === product.id);
    const finalQty = item ? item.amount + qty : qty;

    if (finalQty > product.stock) {
      toast.warning("Selected quantity exceeds stock!");
      return;
    }

    if (item) {
      setCart(
        cart.map((i) => (i.id === product.id ? { ...i, amount: finalQty } : i)),
      );
    } else {
      setCart([...cart, { ...product, amount: qty }]);
    }

    toast.success(`${qty} item(s) added to cart`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
    toast.error("Item removed from cart");
  };

  const increaseAmount = (id) => {
    const item = cart.find((i) => i.id === id);
    if (!item || item.amount >= item.stock) {
      toast.warning("Stock limit reached!");
      return;
    }
    addToCart(item);
  };

  const decreaseAmount = (id) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    if (item.amount === 1) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((i) => (i.id === id ? { ...i, amount: i.amount - 1 } : i)),
      );
      toast.info("Item quantity decreased");
    }
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared successfully");
  };

  const placeOrder = () => {
    if (!user || cart.length === 0) return false;

    const order = {
      id: Date.now(),
      items: cart,
      total,
      date: new Date().toISOString(),
    };

    const prevOrders =
      JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];

    localStorage.setItem(
      `orders_${user.email}`,
      JSON.stringify([...prevOrders, order]),
    );

    const products = JSON.parse(localStorage.getItem("products")) || [];

    const updatedProducts = products.map((p) => {
      const cartItem = cart.find((i) => i.id === p.id);
      return cartItem ? { ...p, stock: p.stock - cartItem.amount } : p;
    });

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setCart([]);
    return true;
  };

  const checkout = () => {
    if (!user) {
      toast.error("Please login to checkout");
      return;
    }

    if (cart.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }

    const success = placeOrder();

    if (success) {
      reloadProducts();
      toast.success(
        "Your order is received and will be delivered within 2 days",
      );
      navigate("/order-success");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addToCartWithQty,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
        clearCart,
        checkout,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
