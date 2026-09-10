import { Routes } from '@angular/router';
import { Despesa } from './features/paginaDespesas/despesa/despesa';
import { Inicio } from './features/inicio/inicio';

export const routes: Routes = [
{
    path:'',
    component: Inicio
},
    {
    path:'despesas',
    component: Despesa
}
]; 
