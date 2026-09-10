import { useState, useEffect } from "react";
import { useParams, Link, data } from "react-router-dom";
import axiosInstance from "../api/axiosinstance";
import { productService } from "../service/productService";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";
import ProductDetail from "../components/ProductDetail";
import Footer from "../components/Footer";

function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        throw new Error("Something happen");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 animate-pulse">
        <div className="h-6 w-24 bg-gray-200 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl border border-gray-200">
          <div className="aspect-square bg-gray-200 rounded-xl" />
          <div className="space-y-4">
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="h-6 w-1/3 bg-gray-200 rounded" />
            <div className="h-20 bg-gray-200 rounded" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ErrorBoundary>
        <Header />
        <ProductDetail props={product} />
        <Footer />
      </ErrorBoundary>
    </>
  );
}

export default Detail;
