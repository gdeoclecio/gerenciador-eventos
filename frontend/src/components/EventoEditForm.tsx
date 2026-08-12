import { useState } from "react";
import { atualizarEvento } from "../services/eventoService";
import type { Evento } from "../types/evento";

interface EventoEditFormProps {
  evento: Evento;
  onEventoAtualizado: () => void;
  onCancelar: () => void;
}

export function EventoEditForm({
  evento,
  onEventoAtualizado,
  onCancelar,
}: EventoEditFormProps) {
  const [data, setData] = useState(evento.data);
  const [localizacao, setLocalizacao] = useState(evento.localizacao);
  const [erro, setErro] = useState("");

async function handleSubmit(event: React.FormEvent) {
  event.preventDefault();

  try {
    setErro("");

    await atualizarEvento(evento.id, {
      data,
      localizacao,
    });

    onEventoAtualizado();
  } catch {
    setErro("Não foi possível atualizar o evento.");
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={data}
        onChange={(event) => setData(event.target.value)}
      />

      <input
        type="text"
        value={localizacao}
        onChange={(event) => setLocalizacao(event.target.value)}
      />

      {erro && <p>{erro}</p>}

      <button type="submit">Salvar alterações</button>
      <button type="button" onClick={onCancelar}>
        Cancelar
      </button>
    </form>
  );
}
