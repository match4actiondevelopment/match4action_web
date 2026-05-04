import { logout } from "@/modules/services";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_PATH || "https://match4action-api-five.vercel.app";

const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 403) {
      await logout();
      window.location.href = window.location.origin;
    } else {
      return Promise.reject(error);
    }
  }
);

export { http };
