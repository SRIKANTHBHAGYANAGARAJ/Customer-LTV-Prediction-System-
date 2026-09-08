import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Stores selected price range for filtering
  const [selectedPrice, setSelectedPrice] = useState("All");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/API/products.json");
        const freshProducts = await response.json();

        const storedProducts = localStorage.getItem("products");

        // First-time load: save API data to localStorage
        if (!storedProducts) {
          localStorage.setItem("products", JSON.stringify(freshProducts));
          setProducts(freshProducts);
          return;
        }

        const parsedStored = JSON.parse(storedProducts);

        // Compare products excluding stock to detect real data changes
        const isSame =
          JSON.stringify(parsedStored.map(({ stock, ...rest }) => rest)) ===
          JSON.stringify(freshProducts.map(({ stock, ...rest }) => rest));

        // Update localStorage only if product data has changed
        if (!isSame) {
          localStorage.setItem("products", JSON.stringify(freshProducts));
          setProducts(freshProducts);
        } else {
          setProducts(parsedStored);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  // Reload products directly from localStorage (used after cart updates)
  const reloadProducts = () => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  };

  // Applies price-based filtering to a product
  const applyPriceFilter = (product) => {
    if (selectedPrice === "All") return true;

    const price = product.price;

    switch (selectedPrice) {
      case "Under 5K":
        return price < 5000;
      case "5K - 20K":
        return price >= 5000 && price <= 20000;
      case "20K - 50K":
        return price > 20000 && price <= 50000;
      case "Above 50K":
        return price > 50000;
      default:
        return true;
    }
  };

  // Combines category and price filters
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    const priceMatch = applyPriceFilter(product);

    return categoryMatch && priceMatch;
  });

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const priceRanges = ["All", "Under 5K", "5K - 20K", "20K - 50K", "Above 50K"];

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        reloadProducts,

        filteredProducts,
        categories,
        selectedCategory,
        setSelectedCategory,

        priceRanges,
        selectedPrice,
        setSelectedPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
