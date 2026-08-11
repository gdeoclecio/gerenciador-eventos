import { useEffect, useState } from "react";
import { listarEventos } from "../services/eventoService";
import type { Evento } from "../types/evento";

export function HomePage() {
    const [eventos, setEventos] = useState<Evento[]>([]);

    useEffect(() => {
        async function carregarEventos() {
            const resposta = await listarEventos();
            setEventos(resposta);
        }

        carregarEventos();
    }, []);

    return(
        <div>
            <h1>Meus Eventos</h1>
            {eventos.length === 0 ? (
                <p>Nenhum evento cadastrado.</p>
            ) : (
                eventos.map((evento) => (
                    <div key={evento.id}>
                        <h2>{evento.nome}</h2>
                        <p>{evento.data}</p>
                        <p>{evento.localizacao}</p>
                    </div>
                ))
            )}
        </div>
    );
}