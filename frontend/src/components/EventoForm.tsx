import { useState } from "react";
import { cadastrarEvento } from "../services/eventoService";

interface EventoFormProps {
  onEventoCadastrado: () => void;
}

export function EventoForm({ onEventoCadastrado }: EventoFormProps) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [imagem, setImagem] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

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
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do evento"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
      />

      <input
        type="date"
        value={data}
        onChange={(event) => setData(event.target.value)}
      />

      <input
        type="text"
        placeholder="Localização"
        value={localizacao}
        onChange={(event) => setLocalizacao(event.target.value)}
      />

      <input
        type="text"
        placeholder="URL da imagem"
        value={imagem}
        onChange={(event) => setImagem(event.target.value)}
      />

      <button type="submit">Adicionar Evento</button>
    </form>
  );
}