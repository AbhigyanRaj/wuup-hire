import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://wuup-hire.onrender.com/api" : "http://localhost:5000/api"),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Auth Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);
