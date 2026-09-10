import { Component, OnInit, signal } from '@angular/core';
import { Despesa } from '../../../core/models/despesa';
import { DespesaService } from '../../../core/service/despesa.service';


@Component({
  imports: [],
  selector: 'app-lista-despesas',
  styleUrl: './listaDespesa.css',
  templateUrl: './listaDespesa.html',
})
export class ListaDespesas implements OnInit {
  readonly despesas = signal<Despesa[]>([]);
  readonly carregando = signal(true);
  readonly erro = signal<string | null>(null);

  constructor(private despesaService: DespesaService){}

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
  }
}
