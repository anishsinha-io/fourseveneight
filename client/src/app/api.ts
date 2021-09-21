import axios from "axios";

export const proxy = `http://localhost:8000/api`;

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
