export interface AdministradorRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface AdministradorResponse {
  id: number;
  nome: string;
  email: string;
}