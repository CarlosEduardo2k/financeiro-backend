import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
//import { Resumo } from './features/inicio/resumo/resumo'; 
//import { ListaDespesas } from './features/paginaDespesas/lista-despesas/listaDespesa';
import { Despesa } from './features/paginaDespesas/despesa/despesa';


@Component({
  imports: [RouterOutlet,RouterLink ,Despesa],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Front-end');
}
