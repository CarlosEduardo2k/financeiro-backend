package br.com.financeiro.backend.repository;

import br.com.financeiro.backend.entity.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DespesaRepository  extends JpaRepository<Despesa, Long> {
    boolean existsByLugarCompraId(long lugarCompraId);

}
