package br.com.financeiro.backend.service;

import br.com.financeiro.backend.entity.LocalCompra;
import br.com.financeiro.backend.exception.RecursoNaoEncontradoException;
import br.com.financeiro.backend.exception.RegraDeNegocioException;
import br.com.financeiro.backend.repository.DespesaRepository;
import br.com.financeiro.backend.repository.LocalCompraRepository;
import br.com.financeiro.backend.validator.LocalCompraValidator;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocalCompraService {

    private final LocalCompraRepository localCompraRepository;
    private final LocalCompraValidator localCompraValidator;
    private final DespesaRepository despesaRepository;

    public LocalCompraService(
            LocalCompraRepository localCompraRepository,
            LocalCompraValidator localCompraValidator,
            DespesaRepository despesaRepository) {
        this.localCompraRepository = localCompraRepository;
        this.localCompraValidator = localCompraValidator;
        this.despesaRepository = despesaRepository;
    }

    public LocalCompra salvar(LocalCompra lugarCompra) {
        localCompraValidator.validar(lugarCompra);
        if (localCompraRepository.existsByNome(lugarCompra.getNome())) {
            throw new RegraDeNegocioException("Local de compra já cadastrado.");
        }
        return localCompraRepository.save(lugarCompra);
    }

    public List<LocalCompra> listarTodos() {
        return localCompraRepository.findAll();
    }

    public LocalCompra buscarPorId(Long id) {
        return localCompraRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Local de compra não encontrado"));
    }

    public LocalCompra atualizar(Long id, LocalCompra lugarCompra) {
        LocalCompra atualizandoLocal = buscarPorId(id);
        localCompraValidator.validar(lugarCompra);
        if (localCompraRepository.existsByNomeAndIdNot(lugarCompra.getNome(), id)) {
            throw new RegraDeNegocioException("Este Local De Compra Já Existe");
        }
        atualizandoLocal.setNome(lugarCompra.getNome());
        return localCompraRepository.save(atualizandoLocal);
    }

    public void excluir(Long id) {
        LocalCompra localCompra = buscarPorId(id);
        if (despesaRepository.existsByLugarCompraId(id)) {
            throw new RegraDeNegocioException("Não é possível excluir porque existem despesas vinculadas a esse local.");
        }
        localCompraRepository.delete(localCompra);
    }
}