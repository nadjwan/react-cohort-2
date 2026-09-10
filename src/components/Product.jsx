import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

function Product({ props }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <>
      {props.map((product, index) => (
        <div
          key={product.id || index}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300"
        >
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-4">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {product.category}
            </span>

            <h3 className="mt-1 text-base font-semibold text-gray-900 truncate">
              {product.name}
            </h3>

            <p className="mt-2 text-lg font-bold text-gray-900">
              RM{product.price}
            </p>

            {/* Action Buttons */}
            <div className="mt-auto pt-4 flex items-center gap-2">
              {/* Detail Button */}
              <Link
                to={`/products/${product.id}`}
                className="flex-1 text-center py-2 px-3 text-xs font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all"
              >
                View Details
              </Link>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={() => addItem(product)}
                className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
                aria-label="Add to cart"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Product;
