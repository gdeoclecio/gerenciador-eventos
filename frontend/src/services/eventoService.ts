import { api } from "./api";
import type { Evento, EventoRequest, EventoUpdate } from "../types/evento";

export async function listarEventos(): Promise<Evento[]> {
  const response = await api.get<Evento[]>("/eventos");

  return response.data;
}

export async function cadastrarEvento(dados:EventoRequest): Promise<Evento>{
    const response = await api.post<Evento>("/eventos", dados);

    return response.data;
}

export async function atualizarEvento(
    eventoId: number,
    dados: EventoUpdate
): Promise<Evento> {
    const response = await api.patch<Evento>(`/eventos/${eventoId}`, dados);
    return response.data;
}

export async function excluirEvento(eventoId: number): Promise<void> {
  await api.delete(`/eventos/${eventoId}`);
}