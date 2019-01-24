import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ComparadorService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/marketplace/skumasters/productos'
    }
    calcularPrecios(resource: any) {
        resource = this.serialize(resource);
        return this.http.put(`api/marketplace/skumasters/calcular-precios-stock`, resource);

    }
}
