import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      // Add item (increments quantity if already in cart)
      addItem: (product) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        });
      },

      // Update quantity (increase/decrease, removes if quantity becomes 0)
      updateQuantity: (productId, newQuantity) => {
        set((state) => {
          if (newQuantity <= 0) {
            return {
              cart: state.cart.filter((item) => item.id !== productId),
            };
          }
          return {
            cart: state.cart.map((item) =>
              item.id === productId ? { ...item, quantity: newQuantity } : item,
            ),
          };
        });
      },

      // Remove single item completely
      removeItem: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },

      // Clear entire cart
      clearCart: () => {
        set({ cart: [] });
      },

      // Helper selectors
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
