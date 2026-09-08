import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import AboutCromaMart from "../components/AboutCromaMart";
import ContactSection from "../components/ContactSection";
import CategoryFilter from "../components/CategoryFilter";
import PriceFilter from "../components/PriceFilter";

const Home = () => {
  const { filteredProducts } = useContext(ProductContext);

  return (
    <div className="bg-[#050b18]">
      {/* Landing section */}
      <Hero />

      <section className="py-20 bg-[#0b132b]">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-semibold mb-10 text-center text-white">
            Explore Our Products
          </h1>

          {/* Product filtering controls */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <CategoryFilter />
            <PriceFilter />
          </div>

          {/* Product listing */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {filteredProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-white/60 text-lg mt-10">
              No products found for selected filters.
            </p>
          )}
        </div>
      </section>

      {/* Static informational sections */}
      <AboutCromaMart />
      <ContactSection />
    </div>
  );
};

export default Home;
