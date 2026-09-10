import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DespesaService } from '../../core/service/despesa.service';
import { Despesa } from '../../core/models/despesa';

@Component({
  imports: [RouterLink],
  selector: 'app-inicio',
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {

  despesas: Despesa[] = [];
  readonly totalDespesas = signal(0);

  constructor(private despesaService: DespesaService) {}

  ngOnInit() {
    this.despesaService.listar().subscribe({
      next: (despesas) => {

        this.despesas = despesas;

        const total = despesas.reduce((soma, despesa) => {
          return soma + despesa.valor;
        }, 0);

        this.totalDespesas.set(total);
      },

      error: (erro) => {
        console.error('Não foi possível carregar as despesas.', erro);
      },
    });
  }
}
