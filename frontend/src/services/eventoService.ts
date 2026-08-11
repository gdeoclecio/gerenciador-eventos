import { api } from "./api";
import type { Evento } from "../types/evento";

export async function listarEventos(): Promise<Evento[]> {
  const response = await api.get<Evento[]>("/eventos");

  return response.data;
}