// http.ts
import { logout } from "@/modules/services";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PATH,
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
      return (window.location.href = window.location.origin);
    } else {
      return Promise.reject(error);
    }
  }
);

export { http };
