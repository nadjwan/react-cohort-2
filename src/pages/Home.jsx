import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { productService } from "../service/productService.js";
import { useDebounce } from "../hooks/debounce.js";
import Header from "../components/Header.jsx";
import Product from "../components/Product.jsx";
import Footer from "../components/Footer.jsx";
import ProductSkeleton from "../components/ProductSkeleton.jsx";
import ProductSearch from "../components/ProductSearch.jsx";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(
        products
          .map((p) => p.category)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b)),
      ),
    ];
  }, [products]);

  const sortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = (product?.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product?.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });
  }, [products, debounceSearchTerm, selectedCategory, sortBy]);

  // Check if error is due to authentication requirement
  const isUnauthorized = error?.response?.status === 401;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="w-full">
            <ProductSkeleton />
          </div>
        ) : isUnauthorized ? (
          /* 401 Login Callout Card */
          <div className="max-w-md w-full text-center space-y-4 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Sign in to Browse Products
            </h2>
            <p className="text-sm text-gray-500">
              Please log in or create an account to view our product catalog and
              start shopping.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/login"
                className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : error ? (
          /* Generic Error Fallback */
          <div className="text-center">
            <p className="text-red-600 font-medium">
              Error fetching products: {error.message}
            </p>
          </div>
        ) : (
          /* Normal Catalog Display */
          <div className="w-full">
            <ProductSearch
              onSearch={setSearchTerm}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <Product props={sortedProducts} />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
