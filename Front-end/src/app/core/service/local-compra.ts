import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalCompra } from '../models/localCompra';


@Injectable({providedIn:'root'})
export class LocalCompraService {
    constructor(private http: HttpClient){}

    cadastrar(nome: string):Observable<LocalCompra>{
        return this.http.post<LocalCompra>('/api/locais-compra',{nome:nome});
    }


    listar(): Observable<LocalCompra[]>{
        return this.http.get<LocalCompra[]>('/api/locais-compra ')
    }
}
