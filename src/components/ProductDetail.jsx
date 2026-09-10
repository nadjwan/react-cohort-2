import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

function ProductDetail({ props }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Products
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-8">
          {/* Product Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-4">
              <img
                src={props.image}
                alt={props.name}
                className="h-full w-full object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded w-max">
              {props.category}
            </span>

            <h1 className="mt-2 text-2xl lg:text-3xl font-bold text-gray-900">
              {props.name}
            </h1>

            {/* Rating & Stock */}
            <div className="mt-2 flex items-center gap-4 text-sm">
              <span className="text-amber-500 font-semibold">
                ★ {props.rating}
              </span>
              <span className="text-gray-300">|</span>
            </div>

            {/* Pricing */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-gray-900">
                RM{props.price}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm text-gray-600 leading-relaxed border-t border-b border-gray-100 py-4">
              {props.description}
            </p>

            {/* Additional Meta */}
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-500">
              <div>
                <dt className="font-semibold text-gray-700">Brand</dt>
                <dd>{props.brand || "Generic"}</dd>
              </div>
            </dl>

            {/* Action */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
              <button
                type="button"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-indigo-100"
                onClick={() => addItem(props)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
