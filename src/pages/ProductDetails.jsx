import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { motion } from "framer-motion";

import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCartWithQty, cart } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  const product = products.find((item) => item.id === parseInt(id));
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center text-white">
        Loading...
      </section>
    );
  }

  const { name, brand, price, description, image, stock } = product;

  const cartItem = cart.find((item) => item.id === product.id);
  const remainingStock = stock - (cartItem ? cartItem.amount : 0);

  const increaseQty = () => qty < remainingStock && setQty(qty + 1);
  const decreaseQty = () => qty > 1 && setQty(qty - 1);

  const handleAddToCart = () => {
    addToCartWithQty(product, qty);
    setQty(1);
  };

  return (
    <section className="py-32 bg-[#020617] min-h-screen text-white relative overflow-hidden">
      {/* Back navigation */}
      <button
        onClick={() => navigate(-1)}
        className="
          absolute top-28 left-6 z-40
          w-11 h-11 rounded-xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          flex items-center justify-center
          text-cyan-400
          transition-all duration-300
          shadow-lg shadow-cyan-500/20
        "
        aria-label="Go back"
      >
        <HiArrowLeft size={22} />
      </button>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Product image with calm breathing animation */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              scale: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="
              flex justify-center
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-2xl p-10
              shadow-[0_0_35px_rgba(34,211,238,0.15)]
            "
          >
            <img
              src={image}
              alt={name}
              className="max-w-[280px] lg:max-w-[350px] mx-auto"
            />
          </motion.div>

          {/* Product details with staggered reveal */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-3xl lg:text-4xl font-semibold mb-2"
            >
              {name}
            </motion.h1>

            {brand && (
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-cyan-400 font-medium mb-4"
              >
                Brand: {brand}
              </motion.p>
            )}

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-white/70 mb-6 leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-3xl font-bold text-red-500 mb-6"
            >
              ₹ {price.toLocaleString()}
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="text-sm text-white/60 mb-6"
            >
              Available Stock:{" "}
              <span className="text-cyan-400 font-medium">
                {remainingStock}
              </span>
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-center gap-4 mb-8"
            >
              <button
                onClick={decreaseQty}
                disabled={qty === 1}
                className="w-10 h-10 rounded-lg bg-white/10 border border-white/20
                           transition disabled:opacity-40"
              >
                −
              </button>

              <span className="text-lg font-semibold w-8 text-center">
                {qty}
              </span>

              <button
                onClick={increaseQty}
                disabled={qty >= remainingStock}
                className="w-10 h-10 rounded-lg bg-white/10 border border-white/20
                           transition disabled:opacity-40"
              >
                +
              </button>
            </motion.div>

            {/* Subtle breathing CTA */}
            <motion.button
              onClick={handleAddToCart}
              disabled={remainingStock === 0}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                px-10 py-4 rounded-xl font-semibold
                bg-gradient-to-r from-cyan-500 to-cyan-400
                text-black
                shadow-[0_0_30px_rgba(34,211,238,0.6)]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
