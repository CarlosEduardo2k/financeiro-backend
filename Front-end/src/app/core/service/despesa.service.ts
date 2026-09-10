import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Despesa } from "../models/despesa";


@Injectable({
    providedIn: 'root'
})

export class DespesaService{
    constructor(private http: HttpClient){}

    listar(): Observable<Despesa[]>{
        return this.http.get<Despesa[]>('/api/despesas');
    }
}
