import { useState } from "react";
import { cadastrarEvento } from "../services/eventoService";
import "./EventoForm.css";

interface EventoFormProps {
  onEventoCadastrado: () => void;
}

export function EventoForm({ onEventoCadastrado }: EventoFormProps) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [imagem, setImagem] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!nome.trim() || !data || !localizacao.trim() || !imagem.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      setErro("");

      await cadastrarEvento({
        nome,
        data,
        localizacao,
        imagem,
      });

      setNome("");
      setData("");
      setLocalizacao("");
      setImagem("");

      onEventoCadastrado();
    } catch {
      setErro(
        "Não foi possível cadastrar o evento. Verifique os dados informados.",
      );
    }
  }

  return (
    <form className="evento-form" onSubmit={handleSubmit}>
      <h2>Adicionar Evento</h2>
      <input
        type="text"
        placeholder="Nome do evento"
        value={nome}
        onChange={(event) => setNome(event.target.value)} required
      />

      <input
        type="date"
        value={data}
        onChange={(event) => setData(event.target.value)} required
      />

      <input
        type="text"
        placeholder="Localização"
        value={localizacao}
        onChange={(event) => setLocalizacao(event.target.value)} required
      />

      <input
        type="text"
        placeholder="URL da imagem"
        value={imagem}
        onChange={(event) => setImagem(event.target.value)} required
      />
      <button className="btn btn-primary" type="submit">
        Adicionar Evento
      </button>
      {erro && <p>{erro}</p>}
    </form>
  );
}
