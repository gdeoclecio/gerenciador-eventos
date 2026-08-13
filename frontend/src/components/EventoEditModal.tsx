import { X } from "lucide-react";
import type { Evento } from "../types/evento";
import { EventoEditForm } from "./EventoEditForm";
import "./EventoModal.css";

interface EventoEditModalProps {
  evento: Evento;
  onFechar: () => void;
  onEventoAtualizado: () => void;
}

export function EventoEditModal({
  evento,
  onFechar,
  onEventoAtualizado,
}: EventoEditModalProps) {
  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div
        className="modal-conteudo"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-fechar"
          onClick={onFechar}
          aria-label="Fechar modal"
        >
          <X size={20} />
        </button>

        <h2>Editar Evento</h2>

        <EventoEditForm
          evento={evento}
          onEventoAtualizado={() => {
            onEventoAtualizado();
            onFechar();
          }}
          onCancelar={onFechar}
        />
      </div>
    </div>
  );
}