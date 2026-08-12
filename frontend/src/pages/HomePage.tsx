import { useEffect, useState } from "react";
import { excluirEvento, listarEventos } from "../services/eventoService";
import type { Evento } from "../types/evento";
import { EventoForm } from "../components/EventoForm";
import { useNavigate } from "react-router-dom";
import { removerToken } from "../services/authService";
import { EventoCard } from "../components/EventoCard";

export function HomePage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoEmEdicao, setEventoEmEdicao] = useState<number | null>(null);
  const navigate = useNavigate();
  const [erro, setErro] = useState("");

  function handleLogout() {
    removerToken();
    navigate("/login");
  }

  async function recarregarEventos() {
    try {
      setErro("");

      const resposta = await listarEventos();
      setEventos(resposta);
    } catch {
      setErro("Não foi possível carregar os eventos.");
    }
  }
  async function handleExcluir(eventoId: number) {
    const confirmou = window.confirm(
      "Tem certeza que deseja excluir este evento?",
    );

    if (!confirmou) {
      return;
    }

    try {
      setErro("");

      await excluirEvento(eventoId);
      await recarregarEventos();
    } catch {
      setErro("Não foi possível excluir o evento.");
    }
  }

  useEffect(() => {
    listarEventos()
      .then(setEventos)
      .catch(() => {
        setErro("Não foi possível carregar os eventos.");
      });
  }, []);

  return (
    <main className="home-page">
      <header className="home-header">
        <div>
          <h1>Meus Eventos</h1>
          <p>Gerencie seus eventos em um só lugar.</p>
        </div>

        <button className="btn btn-secondary" type="button" onClick={handleLogout}>
          Sair
        </button>
      </header>

      {erro && <p>{erro}</p>}

      <EventoForm onEventoCadastrado={recarregarEventos} />

      {eventos.length === 0 ? (
        <p>Nenhum evento cadastrado.</p>
      ) : (
        <div className="eventos-grid">
          {eventos.map((evento) => (
            <EventoCard
              key={evento.id}
              evento={evento}
              emEdicao={eventoEmEdicao === evento.id}
              onEditar={() => setEventoEmEdicao(evento.id)}
              onCancelarEdicao={() => setEventoEmEdicao(null)}
              onEventoAtualizado={() => {
                recarregarEventos();
                setEventoEmEdicao(null);
              }}
              onExcluir={() => handleExcluir(evento.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
