import { Component, input,output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-resumo',
  styleUrl: './resumo.css',
  templateUrl: './resumo.html',
})
export class Resumo {
  total = input<number>();
  atualizar = output<void>(); 
}
