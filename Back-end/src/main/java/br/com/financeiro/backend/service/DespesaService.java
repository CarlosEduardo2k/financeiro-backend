package br.com.financeiro.backend.service;

import br.com.financeiro.backend.entity.Despesa;
import br.com.financeiro.backend.exception.RecursoNaoEncontradoException;
import br.com.financeiro.backend.repository.DespesaRepository;
import br.com.financeiro.backend.repository.LocalCompraRepository;
import br.com.financeiro.backend.validator.DespesaValidator;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DespesaService {
    private final DespesaRepository despesaRepository;
    private final DespesaValidator despesaValidator;
    private final LocalCompraRepository localCompraRepository;

    public DespesaService(DespesaRepository despesaRepository,
           DespesaValidator despesaValidator,
           LocalCompraRepository localCompraRepository){
        this.despesaRepository = despesaRepository;
        this.despesaValidator = despesaValidator;
        this.localCompraRepository = localCompraRepository;
    }
    public Despesa salvar(Despesa despesa){
        despesaValidator.validar(despesa);
        verificalocalDeCompra(despesa);

        return despesaRepository.save(despesa);
    }
    public List<Despesa> listarTodos(){
        return despesaRepository.findAll();
    }
    public Despesa buscarPorId(Long id){
        return despesaRepository.findById(id).orElseThrow(()->
                new RecursoNaoEncontradoException("Despesa Não Encontrada"));
    }
    public Despesa atualizarDespesa(long id, Despesa despesa){
        Despesa atualizandoDespesa =  buscarPorId(id);
        despesaValidator.validar(despesa);
        verificalocalDeCompra(despesa);

        atualizandoDespesa.setDescricao(despesa.getDescricao());
        atualizandoDespesa.setValor(despesa.getValor());
        atualizandoDespesa.setDataDespesa(despesa.getDataDespesa());
        atualizandoDespesa.setLugarCompra(despesa.getLugarCompra());
        return despesaRepository.save(atualizandoDespesa);
    }
    public void excluirDespesa(long id){
        Despesa despesa = buscarPorId(id);
        despesaRepository.delete(despesa);
    }

    private void verificalocalDeCompra(Despesa despesa){
        long localCompraId = despesa.getLugarCompra().getId();
         if (!localCompraRepository.existsById(localCompraId)){
             throw new RecursoNaoEncontradoException("Local Não Encontrado");
         }
    }
}


