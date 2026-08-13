import axios from "axios";
import { obterToken } from "../storage/authStorage";

export const api = axios.create({
  baseURL: "http://192.168.0.9:8080",
  });

  api.interceptors.request.use(async (config) => {
  const token = await obterToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});