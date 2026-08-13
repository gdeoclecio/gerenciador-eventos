import { api } from "./api";
import type { AdministradorRequest } from "../types/administrador";

export async function cadastrarAdministrador(
  dados: AdministradorRequest,
): Promise<void> {
  await api.post("/administradores", dados);
}