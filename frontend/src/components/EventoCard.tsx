import type { Evento } from "../types/evento";
import "./EventoCard.css";
import {
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

interface EventoCardProps {
  evento: Evento;
  onEditar: () => void;
  onExcluir: () => void;
}

export function EventoCard({
  evento,
  
  onEditar,
  onExcluir,
}: EventoCardProps) {

  const dataFormatada = new Date(
  `${evento.data}T00:00:00`
).toLocaleDateString("pt-BR");

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
        <div className="evento-card-topo">
          <div>
            <h2>{evento.nome}</h2>
            <p className="evento-card-data">
              <CalendarDays size={17}/>{dataFormatada}</p>
          </div>
        </div>

        <p className="evento-card-localizacao">
          <MapPin size={17}/>{evento.localizacao}</p>

        <div className="evento-card-acoes">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onEditar}
          >
            <Pencil size={17}/>
            Editar
          </button>

          <button className="btn btn-danger" type="button" onClick={onExcluir}>
            <Trash2 size={17} />
            Excluir
          </button>
        </div>

      </div>
    </div>
  );
}
