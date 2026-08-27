package br.com.financeiro.backend.exception;

public class RegraDeNegocioException extends RuntimeException{
    public RegraDeNegocioException(String mensage){
        super(mensage);
    }
}
