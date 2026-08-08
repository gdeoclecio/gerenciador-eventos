package br.com.neki.gerenciador_eventos.dto.evento;

import java.time.LocalDate;

public record EventoResponseDTO(
    Long id,
    String nome,
    LocalDate data,
    String localizacao,
    String imagem,
    Long adminId
) {
    
}
