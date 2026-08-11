import type { AdministradorRequest, AdministradorResponse } from "../types/administrador";
import { api } from "./api";

export async function cadastrarAdministrador(dados: AdministradorRequest): Promise<AdministradorResponse> {
    const response = await api.post<AdministradorResponse>(
        "/administradores", dados
    );
    return response.data;
}