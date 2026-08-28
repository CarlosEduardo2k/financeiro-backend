package br.com.financeiro.backend.exception;

public class RecursoNaoEncontradoException extends RuntimeException {
    public RecursoNaoEncontradoException(String mensage){
        super(mensage);
    }
}
