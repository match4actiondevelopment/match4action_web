import { logout } from "@/modules/services";
import axios from "axios";

const http = axios.create({
  baseURL: "https://match4action-api-five.vercel.app",
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
