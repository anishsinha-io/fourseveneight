import axios, { AxiosInstance } from "axios";

const createAxiosInstance = (contentType?: string): AxiosInstance => {
  return axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-Type": contentType || "application/json",
    },
  });
};

export default createAxiosInstance;
