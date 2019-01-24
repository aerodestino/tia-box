import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BodegasService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/stock-bodegas/'
    }

    cambiarEstado(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.put(`${this.url}cambiar-estado`, resource);
    }

    getStock(params?: any): Observable<any> {
        params = this.serialize(params);
        return this.http.get(`${this.url}disponibilidad`, { params: this.object2Params(params) });
    }

    solicitarReembolso(id, resource?: any): Observable<any> {
        resource = this.serialize(resource);
        return this.http.post(`${this.url}${id}/hacer-reembolso`, resource);
    }

    hacerDevolucion(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.post(`${this.url}hacer-devolucion`, resource);
    }

    notificarDevolucion(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.post(`${this.url}notificar-devolucion`, resource);
    }

    devolucionDirecta(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.post(`${this.url}devolucion-directa`, resource);
    }

}
