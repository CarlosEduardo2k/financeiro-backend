import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalCompraService } from '../../../core/service/local-compra';

@Component({
  imports: [FormsModule],
  selector: 'app-cadastro-local-compra',
  styleUrl: './cadastro-local-compra.css',
  templateUrl: './cadastro-local-compra.html',
})
export class CadastroLocalCompra {
  nome = '';
  mensagem = signal('');

  constructor(private localCompraService: LocalCompraService){}

 cadastrar() {
  this.mensagem.set('');

  this.localCompraService.cadastrar(this.nome).subscribe({
    next: () => {
      this.mensagem.set('Local cadastrado com sucesso!');
      this.nome = '';
    },
    error: (erro) => {
      if (erro.status === 409) {
        this.mensagem.set('Este local já está cadastrado.');
      } else {
        this.mensagem.set('Não foi possível cadastrar o local.');
      }
    }
  });
}
  cancelar(){
    this.nome = '';
    this.mensagem.set('');
  }

}
