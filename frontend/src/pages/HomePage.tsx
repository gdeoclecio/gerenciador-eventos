import { useEffect, useState } from "react";
import { excluirEvento, listarEventos } from "../services/eventoService";
import type { Evento } from "../types/evento";
import { EventoForm } from "../components/EventoForm";
import { EventoEditForm } from "../components/EventoEditForm";
import { useNavigate } from "react-router-dom";
import { removerToken } from "../services/authService";

export function HomePage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoEmEdicao, setEventoEmEdicao] = useState<number | null>(null);
  const navigate = useNavigate();

  function handleLogout() {
    removerToken();
    navigate("/login");
  }

  async function recarregarEventos() {
    const resposta = await listarEventos();
    setEventos(resposta);
  }
  async function handleExcluir(eventoId: number) {
    const confirmou = window.confirm(
      "Tem certeza que deseja excluir este evento?",
    );

    if (!confirmou) {
      return;
    }

    await excluirEvento(eventoId);
    await recarregarEventos();
  }

  useEffect(() => {
    listarEventos().then(setEventos);
  }, []);

  return (
    <div>
      <h1>Meus Eventos</h1>
      <button onClick={handleLogout}>Sair</button>

      <EventoForm onEventoCadastrado={recarregarEventos} />

      {eventos.length === 0 ? (
        <p>Nenhum evento cadastrado.</p>
      ) : (
        eventos.map((evento) => (
          <div key={evento.id}>
            <h2>{evento.nome}</h2>
            {evento.imagem && (
              <img src={evento.imagem} alt={evento.nome} width="300" />
            )}
            <p>{evento.data}</p>
            <p>{evento.localizacao}</p>

            <button onClick={() => setEventoEmEdicao(evento.id)}>Editar</button>
            <button onClick={() => handleExcluir(evento.id)}>Excluir</button>

            {eventoEmEdicao === evento.id && (
              <EventoEditForm
                evento={evento}
                onEventoAtualizado={() => {
                  recarregarEventos();
                  setEventoEmEdicao(null);
                }}
                onCancelar={() => setEventoEmEdicao(null)}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}
