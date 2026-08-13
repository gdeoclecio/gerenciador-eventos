import { useEffect, useState } from "react";
import { excluirEvento, listarEventos } from "../services/eventoService";
import type { Evento } from "../types/evento";
import { EventoModal } from "../components/EventoModal";
import { EventoEditModal } from "../components/EventoEditModal";
import { ConfirmModal } from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { removerToken } from "../services/authService";
import { EventoCard } from "../components/EventoCard";
import "./HomePage.css";
import { LogOut, Plus } from "lucide-react";

export function HomePage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoEmEdicao, setEventoEmEdicao] = useState<Evento | null>(null);
  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [modalAberta, setModalAberta] = useState(false);
  const [eventoParaExcluir, setEventoParaExcluir] = useState<number | null>(null);

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
  try {
    setErro("");
    await excluirEvento(eventoId);
    await recarregarEventos();
    setEventoParaExcluir(null);
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
      <div className="home-header-texto">
        <span className="home-eyebrow">Gerenciador de Eventos</span>

        <h1>Meus Eventos</h1>

        <p>Organize, acompanhe e atualize seus eventos em um só lugar.</p>
      </div>

      <button
        className="btn btn-secondary"
        type="button"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Sair
      </button>
    </header>

    {erro && <p>{erro}</p>}

    <div className="home-actions">
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => setModalAberta(true)}
      >
        <Plus size={18} />
        Adicionar Evento
      </button>
    </div>

    {modalAberta && (
      <EventoModal
        onFechar={() => setModalAberta(false)}
        onEventoCadastrado={recarregarEventos}
      />
    )}

    {eventoEmEdicao && (
      <EventoEditModal
        evento={eventoEmEdicao}
        onFechar={() => setEventoEmEdicao(null)}
        onEventoAtualizado={() => {
          recarregarEventos();
          setEventoEmEdicao(null);
        }}
      />
    )}

    {eventoParaExcluir && (
      <ConfirmModal
        mensagem="Tem certeza que deseja excluir este evento?"
        onConfirmar={() => handleExcluir(eventoParaExcluir)}
        onCancelar={() => setEventoParaExcluir(null)}
      />
    )}

    {eventos.length === 0 ? (
      <div className="eventos-vazio">
        <h2>Nenhum evento cadastrado</h2>
        <p>
          Adicione seu primeiro evento para começar a organizar sua agenda.
        </p>
      </div>
    ) : (
      <div className="eventos-grid">
        {eventos.map((evento) => (
          <EventoCard
            key={evento.id}
            evento={evento}
            onEditar={() => setEventoEmEdicao(evento)}
            onExcluir={() => setEventoParaExcluir(evento.id)}
          />
        ))}
      </div>
    )}
  </main>
);
}
