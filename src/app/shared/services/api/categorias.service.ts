import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";

@Injectable()
export class CategoriasService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/categorias/'
    }
    getPadres() {
        return this.http.get(`${this.url}padres`);
    }

    getHijos(id) {
        return this.http.get(`${this.url}hijas/${id}`);
    }
    getPadre(id) {
        return this.http.get(`${this.url}padre-inmediato/${id}`);
    }

}
