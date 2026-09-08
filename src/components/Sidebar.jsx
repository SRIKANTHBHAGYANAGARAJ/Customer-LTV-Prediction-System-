import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import CartItem from "./CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, itemAmount, total, clearCart, checkout } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);

  return (
    <div
      className={`
        ${isOpen ? "right-0" : "-right-full"}
        fixed top-0 h-full
        w-full
        md:w-[calc(32vw+50px)]
        lg:w-[calc(30vw+50px)]
        xl:w-[calc(26vw+50px)]
        bg-panel
        shadow-neon
        transition-all duration-300
        z-50
      `}
    >
      <div className="flex flex-col h-full px-6 text-slate-200">
        {/* Sidebar header with cart count and close action */}
        <div className="flex items-center justify-between py-6 border-b border-cyan-400/20">
          <h2 className="text-sm uppercase tracking-widest text-cyan-400">
            Shopping Bag ({itemAmount})
          </h2>

          <button
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full
                       hover:bg-cyan-400/10 transition"
          >
            <IoMdArrowForward className="text-xl text-cyan-400" />
          </button>
        </div>

        {/* Scrollable cart items section */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {cart.length === 0 && (
            <p className="text-center text-slate-400 mt-12">
              Your cart is empty
            </p>
          )}

          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Cart summary and actions */}
        <div className="border-t border-cyan-400/20 py-6 space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-sm uppercase tracking-wide text-slate-300">
              Subtotal
            </span>
            <span className="text-xl font-semibold text-cyan-300">
              ₹{Number(total).toFixed(2)}
            </span>
          </div>

          <button
            onClick={clearCart}
            disabled={cart.length === 0}
            className="flex items-center gap-2 text-sm
                       text-red-400 hover:text-red-300 transition
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiTrash2 />
            Clear Cart
          </button>

          <Link
            to="/"
            onClick={handleClose}
            className="block w-full text-center py-3 rounded-md
                       bg-white/10 hover:bg-cyan-400/20
                       text-slate-200 font-medium transition"
          >
            View Cart
          </Link>

          <button
            onClick={checkout}
            disabled={!user || cart.length === 0}
            className="block w-full text-center py-3 rounded-md
                       bg-cyan-500 hover:bg-cyan-400
                       text-slate-900 font-semibold tracking-wide transition
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {!user ? "Login to Checkout" : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
