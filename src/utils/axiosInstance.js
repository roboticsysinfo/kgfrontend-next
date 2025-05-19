"use client"
import React from "react"
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}`,
});

// ✅ Request Interceptor (Token from Cookies)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // 🍪 Get token from cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (Handle 401 errors)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("userRole");
      Cookies.remove("farmerId");
      Cookies.remove("farmerName");

      toast.error("Session expired! Please log in again.");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
