package br.com.financeiro.backend.controller;

import br.com.financeiro.backend.entity.LocalCompra;
import br.com.financeiro.backend.service.LocalCompraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/locais-compra")
public class LocalCompraController {
    private final LocalCompraService localCompraService;

    public LocalCompraController(LocalCompraService localCompraService) {
        this.localCompraService = localCompraService;
    }

    @PostMapping
    public ResponseEntity<LocalCompra> salvar(@RequestBody LocalCompra lugarCompra) {
        LocalCompra localSalvo = localCompraService.salvar(lugarCompra);
        return ResponseEntity.status(HttpStatus.CREATED).body(localSalvo);
    }

    @GetMapping
    public ResponseEntity<List<LocalCompra>> listar() {
        List<LocalCompra> locais = localCompraService.listarTodos();
        return ResponseEntity.status(HttpStatus.OK).body(locais);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocalCompra> buscar(@PathVariable Long id) {
        LocalCompra localCompra = localCompraService.buscarPorId(id);
        return ResponseEntity.status(HttpStatus.OK).body(localCompra);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocalCompra> atualizar(@PathVariable long id,@RequestBody LocalCompra localCompra) {
        LocalCompra localCompraAtualizado = localCompraService.atualizar(id, localCompra);
        return ResponseEntity.status(HttpStatus.OK).body(localCompraAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir (@PathVariable Long id) {
        localCompraService.excluir(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
