import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe,DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Despesa } from '../../../core/models/despesa';
import { DespesaService } from '../../../core/service/despesa.service';
import { LocalCompra } from '../../../core/models/localCompra';
import { LocalCompraService } from '../../../core/service/local-compra';


@Component({
  imports: [CurrencyPipe, DatePipe, FormsModule],
  selector: 'app-lista-despesas',
  styleUrl: './listaDespesa.css',
  templateUrl: './listaDespesa.html',
})
export class ListaDespesas implements OnInit {
  readonly despesas = signal<Despesa[]>([]);
  readonly carregando = signal(true);
  readonly erro = signal<string | null>(null);
  readonly locaisCompra = signal<LocalCompra[]>([]);

  despesaEmEdicao = signal<Despesa|null>(null);
  descricao = '';
  valor: number | null = null;
  dataDespesa = '';
  localCompraId: number | null = null;

  constructor(private despesaService: DespesaService, private localCompraService: LocalCompraService){}

  ngOnInit() {
    this.despesaService.listar().subscribe({
      next: (despesas) => {
        console.log('Despesas recebidas:', despesas);
        this.despesas.set(despesas);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Não foi possível carregar as despesas:', erro);
        this.erro.set('Não foi possível carregar as despesas.');
        this.carregando.set(false);
      },
    });
    this.localCompraService.listar().subscribe({
  next: (locais) => {
    this.locaisCompra.set(locais);
  },
  error: (erro) => {
    console.error('Erro ao carregar locais de compra:', erro);
  }
});
  }

  editar(despesa: Despesa): void {
  this.despesaEmEdicao.set(despesa);

  this.descricao = despesa.descricao;
  this.valor = despesa.valor;
  this.dataDespesa = despesa.dataDespesa;
  this.localCompraId = despesa.lugarCompra.id;
}

salvarEdicao(): void {
  const despesaAtual = this.despesaEmEdicao();

  if (!despesaAtual) {
    return;
  }

  if (!this.descricao.trim()) {
    this.erro.set('Informe a descrição da despesa.');
    return;
  }

  if (this.valor === null || this.valor <= 0) {
    this.erro.set('Informe um valor maior que zero.');
    return;
  }

  if (!this.dataDespesa) {
    this.erro.set('Informe a data da despesa.');
    return;
  }

  const localSelecionado = this.locaisCompra().find(
    local => local.id === this.localCompraId
  );

  if (!localSelecionado) {
    this.erro.set('Selecione um local de compra válido.');
    return;
  }

  const despesaAtualizada = {
    descricao: this.descricao.trim(),
    valor: this.valor,
    dataDespesa: this.dataDespesa,
    lugarCompra: localSelecionado
  };

  this.despesaService.atualizar(
    despesaAtual.id,
    despesaAtualizada
  ).subscribe({
    next: (despesaSalva) => {
      this.despesas.update(despesas =>
        despesas.map(despesa =>
          despesa.id === despesaSalva.id
            ? despesaSalva
            : despesa
        )
      );

      this.despesaEmEdicao.set(null);
      this.erro.set(null);
    },
    error: (erro) => {
      console.error('Erro ao atualizar despesa:', erro);
      this.erro.set('Não foi possível atualizar a despesa.');
    }
  });
}
cancelarEdicao(): void {
  this.despesaEmEdicao.set(null);
  this.erro.set(null);
}
}
