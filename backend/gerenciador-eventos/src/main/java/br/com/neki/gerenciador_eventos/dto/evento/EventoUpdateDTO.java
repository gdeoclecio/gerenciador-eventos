package br.com.neki.gerenciador_eventos.dto.evento;

import java.time.LocalDate;

public record EventoUpdateDTO(
    LocalDate data,
    String localizacao
) {
    
}
