package br.com.neki.gerenciador_eventos.dto.error;

import java.time.LocalDateTime;

public record ErrorResponseDTO (
    int status,
    String erro,
    LocalDateTime timestamp
) {
    
}
