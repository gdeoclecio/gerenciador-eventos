package br.com.neki.gerenciador_eventos.dto.evento;

import java.time.LocalDate;

import jakarta.validation.constraints.Size;

public record EventoUpdateDTO(
    LocalDate data,

    @Size(max = 100)
    String localizacao
) {
    
}
