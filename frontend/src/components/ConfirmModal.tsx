interface ConfirmModalProps {
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ConfirmModal({
  mensagem,
  onConfirmar,
  onCancelar,
}: ConfirmModalProps) {
  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div
        className="modal-conteudo"
        onClick={(event) => event.stopPropagation()}
      >
        <h2>Confirmar exclusão</h2>

        <p>{mensagem}</p>

        <div className="confirm-modal-acoes">
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirmar}
          >
            Excluir
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}