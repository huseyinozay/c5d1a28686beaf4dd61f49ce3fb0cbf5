import axios from "axios";

export default {
  install: (app) => {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_URL,
    });

    axiosInstance.interceptors.request.use((config) => {
      config.headers["apiKey"] = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
      return config;
    });

    app.config.globalProperties.$http = axiosInstance;

    app.provide("http", axiosInstance);
  },
};
