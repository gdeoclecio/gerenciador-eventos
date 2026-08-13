import axios from "axios";
import { obterToken, removerToken } from "../storage/authStorage";

export const api = axios.create({
  baseURL: "http://192.168.0.9:8080",
  });

  api.interceptors.request.use(async (config) => {
  const token = await obterToken();

  const rotaPublica =
    config.url === "/auth/login" ||
    config.url === "/administradores";

  if (token && !rotaPublica) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      await removerToken();
    }

    return Promise.reject(error);
  }
);