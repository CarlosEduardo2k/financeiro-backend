package br.com.financeiro.backend.validator;

import br.com.financeiro.backend.entity.LocalCompra;
import br.com.financeiro.backend.exception.RegraDeNegocioException;
import org.springframework.stereotype.Component;

@Component
public class LocalCompraValidator {
    public void validar(LocalCompra localCompra) {
        if (localCompra.getNome() == null || localCompra.getNome().isBlank()){
            throw new RegraDeNegocioException("O nome do local de compra é obrigatório");
        }
    }
}