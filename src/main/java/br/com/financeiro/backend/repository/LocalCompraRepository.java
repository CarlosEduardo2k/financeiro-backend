package br.com.financeiro.backend.repository;

import br.com.financeiro.backend.entity.LocalCompra;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalCompraRepository extends JpaRepository<LocalCompra, Long> {
    boolean existsByNome(String nome);
    boolean existsByNomeAndIdNot(String nome, Long id);
}
