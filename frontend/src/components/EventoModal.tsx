import { EventoForm } from "./EventoForm";
import "./EventoModal.css";

interface EventoModalProps {
  onFechar: () => void;
  onEventoCadastrado: () => void;
}

export function EventoModal({
  onFechar,
  onEventoCadastrado,
}: EventoModalProps) {
  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div
        className="modal-conteudo"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-fechar" onClick={onFechar}>
          ×
        </button>

        <EventoForm
          onEventoCadastrado={() => {
            onEventoCadastrado();
            onFechar();
          }}
        />
        <button type="button" className="btn btn-secondary modal-botao-fechar" onClick={onFechar}>
          Fechar
        </button>
      </div>
    </div>
  );
}
