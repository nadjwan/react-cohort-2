import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>
            <p className="text-gray-500 text-sm">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/"
              className="inline-block mt-4 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all"
            >
              Start Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between border-b pb-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Item List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-100 shrink-0"
                  />
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      RM{item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-base font-bold text-gray-900 w-24 text-right">
                    RM{(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-xl border border-gray-200 bg-gray-50 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

              <div className="space-y-2 text-sm text-gray-600 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    RM{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between text-base font-bold text-gray-900 pt-1">
                <span>Total</span>
                <span>RM{totalPrice.toFixed(2)}</span>
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 active:scale-98 transition-all"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="block text-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors pt-2"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
