import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { id, image, category, brand, name, price } = product;

  return (
    <div className="w-full group">
      {/* Interactive product card with hover actions */}
      <div
        className="
          relative h-[320px] mb-4 overflow-hidden rounded-xl
          bg-[#0f172a]
          border border-white/10
          transition-all duration-500
          group-hover:-translate-y-2
          group-hover:shadow-2xl
          group-hover:shadow-cyan-500/20
        "
      >
        <div className="w-full h-full flex justify-center items-center">
          <img
            src={image}
            alt={name}
            className="
              max-h-[180px] object-contain
              transition-all duration-500 ease-out
              group-hover:scale-105 group-hover:rotate-[1deg]
            "
          />
        </div>

        {/* Actions revealed on hover */}
        <div
          className="
            absolute top-6 right-4 flex flex-col gap-3
            opacity-0 translate-x-6
            group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-300 delay-100
          "
        >
          <button
            onClick={() => addToCart(product)}
            className="
              w-11 h-11 rounded-xl
              bg-gradient-to-br from-teal-400 to-cyan-500
              flex items-center justify-center
              text-white
              shadow-lg shadow-cyan-500/30
              hover:scale-110
              transition
            "
            title="Add to cart"
          >
            <FontAwesomeIcon icon={faPlus} className="text-lg" />
          </button>

          <Link
            to={`/product/${id}`}
            className="
              w-11 h-11 rounded-xl
              bg-white text-black
              flex items-center justify-center
              shadow-md
              hover:scale-110 hover:bg-gray-200
              transition
            "
            title="View product"
          >
            <BsEyeFill size={20} />
          </Link>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Basic product details */}
      <div className="text-white space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-wide text-gray-400 uppercase">
            {category}
          </p>
          {brand && (
            <p className="text-xs text-cyan-400/70 font-medium">{brand}</p>
          )}
        </div>

        <Link to={`/product/${id}`}>
          <h2 className="font-semibold hover:text-cyan-400 transition">
            {name}
          </h2>
        </Link>

        <p className="font-semibold text-lg text-cyan-400">
          ₹ {price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Product;
