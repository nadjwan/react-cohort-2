import axiosInstance from "../api/axiosinstance";

export const userService = {
  getUsers: async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
  },

  login: async (userData) => {
    const response = await axiosInstance.post("/users/login", userData);
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;
  },
};
