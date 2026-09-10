import axiosInstance from "../api/axiosinstance";

export const productService = {
  getProducts: async () => {
    const response = await axiosInstance.get("/products");
    return response.data;
  },

  getProductById: async (id) => {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  },
};
