"use client"
import React from "react"
import axios from "axios";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}`, // ⚡ API Base URL
});

// ✅ Request Interceptor (Har request ke sath token attach hoga)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (Token expire hone par auto logout)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      localStorage.removeItem("farmerId");
      localStorage.removeItem("farmerName");
;

      toast.error("Session expired! Please log in again.");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
