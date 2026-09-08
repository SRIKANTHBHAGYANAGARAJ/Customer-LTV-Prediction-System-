import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />

      {/* Card */}
      <div
        className="
          relative z-10
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-3xl
          px-10 py-14
          text-center
          shadow-[0_0_40px_rgba(34,211,238,0.25)]
          max-w-md w-full
        "
      >
        {/* Icon */}
        <div
          className="
            mx-auto mb-6
            w-20 h-20
            rounded-full
            flex items-center justify-center
            bg-cyan-400/10
            border border-cyan-400/30
            shadow-[0_0_25px_rgba(34,211,238,0.4)]
          "
        >
          <span className="text-3xl text-cyan-400 font-bold">✓</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-white mb-3">
          Order Placed Successfully
        </h1>

        {/* Message */}
        <p className="text-white/70 leading-relaxed mb-8">
          Thank you for shopping with Croma Mart. Your order has been confirmed
          and will be delivered within
          <span className="text-cyan-400 font-medium"> 2 business days</span>.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="
            inline-block
            px-10 py-3
            rounded-xl
            font-semibold
            bg-gradient-to-r from-cyan-400 to-blue-500
            text-black
            hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]
            hover:scale-105
            transition-all duration-300
          "
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default OrderSuccess;
