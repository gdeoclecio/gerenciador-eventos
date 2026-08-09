package br.com.neki.gerenciador_eventos.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.neki.gerenciador_eventos.dto.error.ErrorResponseDTO;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailJaCadastradoException.class)
    public ResponseEntity<ErrorResponseDTO> tratarEmailjaCadastrado(
            EmailJaCadastradoException exception) {

        ErrorResponseDTO erro = new ErrorResponseDTO(
                HttpStatus.CONFLICT.value(),
                exception.getMessage(),
                LocalDateTime.now());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(erro);
    }

    @ExceptionHandler(CredenciaisInvalidasException.class)
    public ResponseEntity<ErrorResponseDTO> tratarCredenciaisInvalidas(
            CredenciaisInvalidasException exception) {

        ErrorResponseDTO erro = new ErrorResponseDTO(
                HttpStatus.UNAUTHORIZED.value(),
                exception.getMessage(),
                LocalDateTime.now());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(erro);
    }

    @ExceptionHandler(AdministradorNaoEncontradoException.class)
    public ResponseEntity<ErrorResponseDTO> tratarAdministradorNaoEncontrado(
            AdministradorNaoEncontradoException exception) {

        ErrorResponseDTO erro = new ErrorResponseDTO(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                LocalDateTime.now());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(erro);
    }

    @ExceptionHandler(EventoNaoEncontradoException.class)
    public ResponseEntity<ErrorResponseDTO> tratarEventoNaoEncontrado(
            EventoNaoEncontradoException exception) {

        ErrorResponseDTO erro = new ErrorResponseDTO(HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                LocalDateTime.now());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(erro);
    }

    @ExceptionHandler(AcessoNegadoException.class)
    public ResponseEntity<ErrorResponseDTO> tratarAcessoNegado(
            AcessoNegadoException exception) {

        ErrorResponseDTO erro = new ErrorResponseDTO(HttpStatus.FORBIDDEN.value(),
                exception.getMessage(),
                LocalDateTime.now());

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(erro);
    }

    @ExceptionHandler(IllegalArgumentException.class)
      public ResponseEntity<ErrorResponseDTO> tratarArgumentoInvalido(
        IllegalArgumentException exception) {

    ErrorResponseDTO erro = new ErrorResponseDTO(
        HttpStatus.BAD_REQUEST.value(),
        exception.getMessage(),
        LocalDateTime.now()
    );

    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(erro);
}

}
