import type { Evento } from "../types/evento";
import { EventoEditForm } from "./EventoEditForm";

interface EventoCardProps {
  evento: Evento;
  emEdicao: boolean;
  onEditar: () => void;
  onCancelarEdicao: () => void;
  onEventoAtualizado: () => void;
  onExcluir: () => void;
}

export function EventoCard({
  evento,
  emEdicao,
  onEditar,
  onCancelarEdicao,
  onEventoAtualizado,
  onExcluir,
}: EventoCardProps) {
  return (
    <div className="evento-card">
      {evento.imagem && (
        <img
          className="evento-card-imagem"
          src={evento.imagem}
          alt={evento.nome}
        />
      )}

      <div className="evento-card-conteudo">
        <h2>{evento.nome}</h2>

        <p>{evento.data}</p>
        <p>{evento.localizacao}</p>

        <div className="evento-card-acoes">
          <button className="btn btn-secondary" type="button" onClick={onEditar}>
            Editar
          </button>

          <button className="btn btn-danger" type="button" onClick={onExcluir}>
            Excluir
          </button>
        </div>

        {emEdicao && (
          <EventoEditForm
            evento={evento}
            onEventoAtualizado={onEventoAtualizado}
            onCancelar={onCancelarEdicao}
          />
        )}
      </div>
    </div>
  );
}
