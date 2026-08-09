package br.com.neki.gerenciador_eventos.exception;

public class CredenciaisInvalidasException extends RuntimeException {

    public CredenciaisInvalidasException(String mensagem){
        super(mensagem);
    }
    
}
