import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  install: (app) => {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_URL,
    });

    axiosInstance.interceptors.request.use((config) => {
      config.headers["apiKey"] = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const errorMessage = error.response.data.message
          ? error.response.data.message
          : error.response.data.error.message;
        toast.error(errorMessage);

        return Promise.reject(error);
      }
    );

    app.config.globalProperties.$http = axiosInstance;

    app.provide("http", axiosInstance);
  },
};
