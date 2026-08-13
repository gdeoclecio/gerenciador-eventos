import { api } from "./api";
import type { LoginRequest, LoginResponse } from "../types/auth";

export async function login(dados: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", dados);

  return response.data;
}