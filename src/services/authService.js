import axiosInstance from "../utils/axiosInstance";
import tokenMethod from "../utils/token";

export const authService = {
  login: (payload) => {
    return axiosInstance.post("/customer/login", payload);
  },
  register: (payload) => {
    return axiosInstance.post("/customer/register", payload);
  },
  getProfile: () => {
    return axiosInstance.get("/customer/profiles");
  },
};
