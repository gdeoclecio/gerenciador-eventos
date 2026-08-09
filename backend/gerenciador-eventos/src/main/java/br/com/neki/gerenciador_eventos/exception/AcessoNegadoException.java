package br.com.neki.gerenciador_eventos.exception;

public class AcessoNegadoException extends RuntimeException {

    public AcessoNegadoException(String mensagem){
        super(mensagem);
    }
}
