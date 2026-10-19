import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CadastroLocalCompra } from "../cadastro-local-compra/cadastro-local-compra";
import { CadastroDespesa } from "../cadastro-despesa/cadastro-despesa";
import { ListaDespesas } from "../lista-despesas/listaDespesa";

@Component({
    selector: 'app-despesa',
    imports: [
        RouterLink,
        CadastroLocalCompra,
        CadastroDespesa,
        ListaDespesas
    ],
    templateUrl: './despesa.html',
    styleUrl: './despesa.css'
})
export class Despesa {

    telaSelecionada = signal<'cadastro' | 'lista' | 'locais'>('cadastro');

    mostrarCadastro() {
        this.telaSelecionada.set('cadastro');
    }

    mostrarLista() {
        this.telaSelecionada.set('lista');
    }

    mostrarLocais() {
        this.telaSelecionada.set('locais');
    }
}