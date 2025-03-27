import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  },
});

export default api;
