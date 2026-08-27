package br.com.financeiro.backend.validator;

import br.com.financeiro.backend.entity.Despesa;
import br.com.financeiro.backend.exception.RegraDeNegocioException;
import org.springframework.stereotype.Component;

@Component
public class DespesaValidator {
    public void validar(Despesa despesa) {
        if (despesa.getDescricao() == null || despesa.getDescricao().isBlank()) {
            throw new RegraDeNegocioException("A descrição da despesa é obrigatória");
        }
        if (despesa.getValor() == null || despesa.getValor().signum() <= 0) {
            throw new RegraDeNegocioException("O valor da despesa deve ser maior que zero");
        }
        if (despesa.getDataDespesa() == null) {
            throw new RegraDeNegocioException("A data da despesa é obrigatória");
        }
        if (despesa.getLugarCompra() == null) {
            throw new RegraDeNegocioException("O local da compra é obrigatório");
        }
    }
}