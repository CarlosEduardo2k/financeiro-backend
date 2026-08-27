package br.com.financeiro.backend.controller;


import br.com.financeiro.backend.entity.Despesa;
import br.com.financeiro.backend.service.DespesaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/despesas")

public class DespesaController {
    private final DespesaService despesaService;

    public  DespesaController(DespesaService despesaService) {
        this.despesaService = despesaService;

    }
    @PostMapping
    public ResponseEntity<Despesa> salvar(@RequestBody Despesa despesa){
        Despesa despesaSalva = despesaService.salvar(despesa);
        return ResponseEntity.status(HttpStatus.CREATED).body(despesaSalva);
    }

    @GetMapping
    public ResponseEntity<List<Despesa>> listar(){
        List<Despesa>  despesas = despesaService.listarTodos();
        return ResponseEntity.status(HttpStatus.OK).body(despesas);
    }

    @GetMapping("/{id}")
    public  ResponseEntity<Despesa> buscar(@PathVariable Long id){
        Despesa despesa = despesaService.buscarPorId(id);
        return ResponseEntity.status(HttpStatus.OK).body(despesa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Despesa> atualizar(@PathVariable Long id, @RequestBody Despesa despesa){
        Despesa despesaAtualizada = despesaService.atualizarDespesa(id, despesa);
        return ResponseEntity.status(HttpStatus.OK).body(despesaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id){
        despesaService.excluirDespesa(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
