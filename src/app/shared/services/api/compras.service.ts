import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ComprasService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/compras/'
    }

    listPorRevisar(params?: any, responseType?: any): Observable<any> {
        if (!params)
            return this.http.get(this.url);
        params = this.serialize(params);
        return this.http.get(`${this.url}por-revisar`, { params: this.object2Params(params), responseType: responseType });

    }

    exportar(params: any, responseType?: any) {
        return this.http.get(`${this.url}exportar`, { params: this.object2Params(this.serialize(params)), responseType: responseType });
    }

    getBodegas(id) {
        return this.http.get(`${this.url}${id}/bodegas`);
    }

    agregarBodega(id, resource) {
        resource = this.serialize(resource);
        return this.http.post(`${this.url}${id}/stock`, resource);
    }

    revisar(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.put(`${this.url}por-revisar`, resource);
    }

    getNotas(id): Observable<any> {
        return this.http.get(`${this.url}${id}/notas`);
    }

    getCompra(id): Observable<any> {
        return this.http.get(`${this.url}${id}/show`);
    }

    bajarGuia(compraId, responseType?: any) {
        return this.http.get(`${this.url}${compraId}/bajar-guia`, { responseType: responseType });
    }

    subirGuia(resource: any, id): Observable<any> {
        return this.http.post(`${this.url}${id}/subir-guia`, resource);
    }

}
