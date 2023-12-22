import axios from "axios";
import { BASE_URL } from "../constant/environments";
import tokenMethod from "./token";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Interceptor request
axiosInstance.interceptors.request.use(
  // Handle request before send
  (config) => {
    config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    return config;
  },
  // Handle error
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor response
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error", error);
    const originalRequest = error.config;

    // If STATUS_CODE === 403 & request don't contain key `_retry`
    if (
      error.response?.status === 403 ||
      (error.response?.status === 401 && !!!originalRequest._retry)
    ) {
      originalRequest._retry = true;

      try {
        // Call API to update new token
        const res = await axiosInstance.put("/customer/refresh", {
          refreshToken: tokenMethod.get()?.refreshToken,
        });

        const { token: accessToken, refreshToken } = res.data.data || {};

        // Save new token into client-storage
        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        // Change token in header by new token of initial request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Callback initial request with new token
        return axiosInstance(originalRequest);
      } catch (error) {
        // Handle error if can't update new token
        tokenMethod.remove();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
