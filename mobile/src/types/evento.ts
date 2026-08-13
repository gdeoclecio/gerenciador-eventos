export interface Evento {
  id: number;
  nome: string;
  data: string;
  localizacao: string;
  imagem: string | null;
  adminId: number;
}
export interface EventoRequest {
  nome: string;
  data: string;
  localizacao: string;
  imagem: string;
} 
export interface EventoUpdate {
  data?: string;
  localizacao?: string;
}