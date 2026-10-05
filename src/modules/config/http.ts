import axios from "axios";

const http = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_PATH ||
    "https://match4action-api-five.vercel.app",
  headers: { "Content-Type": "application/json" },
});

// A forbidden action is not a logout. Let each screen show its error/retry state.
export { http };