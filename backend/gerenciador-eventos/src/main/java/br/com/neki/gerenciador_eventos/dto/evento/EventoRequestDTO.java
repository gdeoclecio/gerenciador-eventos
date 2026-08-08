package br.com.neki.gerenciador_eventos.dto.evento;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EventoRequestDTO(
    @NotBlank
    @Size(max = 150)
    String nome,

    @NotNull
    LocalDate data,

    @NotBlank
    @Size(max = 100)
    String localizacao,

    @Size(max = 255)
    String imagem,

    @NotNull
    Long adminId
) {

    
}
