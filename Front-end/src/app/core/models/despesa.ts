import { LocalCompra } from "./localCompra";


export interface Despesa{
    id: number;
    descricao: string;
    valor: number;
    dataDespesa: string;
    lugarCompra: LocalCompra;
}