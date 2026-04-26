import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Token is now handled automatically via HttpOnly cookies.
  return config;
});

export default api;
