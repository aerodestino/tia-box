import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LogisticasService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/logistica/'
    }

    getProductos(id): Observable<any> {
        return this.http.get(`${this.url}${id}/productos`);
    }

    agregarProducto(id, resource) {
        resource = this.serialize(resource);
        return this.http.post(`${this.url}${id}/item`, resource);
    }

    eliminarProducto(data) {
        return this.http.delete(`${this.url}${data.id}/item/${data.productoVentaId}`);
    }

}
