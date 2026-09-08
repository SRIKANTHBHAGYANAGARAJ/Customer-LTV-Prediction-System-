import React, { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { FaChevronDown } from "react-icons/fa";

const CategoryFilter = () => {
  const { categories, selectedCategory, setSelectedCategory } =
    useContext(ProductContext);

  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center mb-16 relative z-50">
      <div className="w-72 relative">
        {/* Filter label shown above dropdown */}
        <p className="text-center text-sm text-white/60 mb-2">
          Filter by Category
        </p>

        {/* Selected category box */}
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
          <span className="text-white font-medium">{selectedCategory}</span>

          <FaChevronDown
            className={`text-cyan-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Category dropdown menu */}
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
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setOpen(false);
                }}
                className={`
                  px-5 py-3 text-sm cursor-pointer transition
                  ${
                    selectedCategory === category
                      ? "bg-cyan-500 text-black font-semibold"
                      : "text-white/80 hover:bg-white/10"
                  }
                `}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
