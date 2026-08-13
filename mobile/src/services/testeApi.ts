import { api } from "./api";

export async function testarApi() {
  const response = await api.get("/eventos");
  return response.data;
}