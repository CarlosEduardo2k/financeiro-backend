import { Component,signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalCompraService } from '../../../core/service/local-compra';
import { LocalCompra } from '../../../core/models/localCompra';
import { DespesaService } from '../../../core/service/despesa.service';

@Component({
  imports: [FormsModule],
  selector: 'app-cadastro-despesa',
  styleUrl: './cadastro-despesa.css',
  templateUrl: './cadastro-despesa.html',
})
export class CadastroDespesa  implements OnInit{
  locaisCompra = signal<LocalCompra[]>([]);
  descricao ='';
  valor: number | null = null;
  dataDespesa = '';
  localCompraId: number | null=null;
  mensagem = signal(''); 

  constructor(private localCompraService : LocalCompraService,private despesaService: DespesaService){}

  cadastrar(): void {
  // 1. Validar a descrição
  if (!this.descricao.trim()) {
    this.mensagem.set('Informe a descrição da despesa.');
    return;
  }
  // 2. Validar o valor
  if (this.valor === null || this.valor <= 0) {
    this.mensagem.set('Informe um valor maior que zero.');
    return;
  }
  // 3. Validar a data
  if (!this.dataDespesa) {
    this.mensagem.set('Informe a data da despesa.');
    return;
  }
  // 4. Validar o local de compra
  const localSelecionado = this.locaisCompra().find(local => local.id ===this.localCompraId);
  if (!localSelecionado){
    this.mensagem.set('o local de compra Selecionado não foi encontrdo');
    return;
  }
  // 5. Organizar os dados
  const novaDespesa = {
    descricao: this.descricao.trim(),
    valor: this.valor,
    dataDespesa: this.dataDespesa,
    lugarCompra: localSelecionado
  };
  // 6. Enviar os dados ao backend
  this.despesaService.cadastrar(novaDespesa).subscribe({
    // Cadastro concluído
    next: () => {this.mensagem.set('Despesa cadastrada com sucesso!');},
    // Ocorreu um erro
    error: (erro) => {console.error('Erro ao cadastrar despesa:', erro);
      this.mensagem.set('Não foi possível cadastrar a despesa.');
    }
  });

}
  ngOnInit(): void {
    this.localCompraService.listar().subscribe({
      next: (locais)=>{
        this.locaisCompra.set(locais);
      },
      error:(erro)=>{
        console.error('Erro ao carregar Locais De Compra:', erro);
      }
    })
  }
  

}

