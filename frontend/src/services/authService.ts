import { api } from "./api";
import type { LoginRequest, LoginResponse } from "../types/auth";

export async function login(dados: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", dados);

  return response.data;
}
export function salvarToken(token: string) {
  localStorage.setItem("token", token);
}

export function obterToken() {
  return localStorage.getItem("token");
}

export function removerToken() {
  localStorage.removeItem("token");
}