import React, { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { FaChevronDown } from "react-icons/fa";

const PriceFilter = () => {
  const { priceRanges, selectedPrice, setSelectedPrice } =
    useContext(ProductContext);

  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center mb-16 relative z-30">
      <div className="w-72 relative">
        {/* Label shown above the dropdown */}
        <p className="text-center text-sm text-white/60 mb-2">
          Filter by Price
        </p>

        {/* Dropdown trigger */}
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="
            flex items-center justify-between
            px-5 py-3 rounded-2xl
            bg-gradient-to-r from-[#0f172a] to-[#020617]
            border border-cyan-400/30
            cursor-pointer
            shadow-lg shadow-cyan-500/10
            hover:border-cyan-400/60
            transition
          "
        >
          <span className="text-white font-medium">{selectedPrice}</span>

          <FaChevronDown
            className={`text-cyan-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Price options dropdown */}
        {open && (
          <div
            className="
              absolute left-0 right-0 top-full mt-3
              rounded-2xl overflow-hidden
              bg-[#020617]
              border border-white/10
              shadow-2xl shadow-black/40
              backdrop-blur-xl
            "
          >
            {priceRanges.map((range) => (
              <div
                key={range}
                onClick={() => {
                  setSelectedPrice(range);
                  setOpen(false);
                }}
                className={`
                  px-5 py-3 text-sm cursor-pointer transition
                  ${
                    selectedPrice === range
                      ? "bg-cyan-500 text-black font-semibold"
                      : "text-white/80 hover:bg-white/10"
                  }
                `}
              >
                {range}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceFilter;
