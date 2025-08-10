import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FacturacionesService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/facturaciones/'
    }

    getMine(params?: any, responseType?: any): Observable<any> {
        if (!params)
            return this.http.get(`${this.url}mine`);
        params = this.serialize(params);
        return this.http.get(`${this.url}mine`, { params: this.object2Params(params), responseType: responseType });
    }

     getArticulos(params: any): Observable<any> {
        params = this.serialize(params);
        return this.http.get(`${this.url}articulos`, { params: this.object2Params(params) });
    }

    getFormasPago(params: any): Observable<any> {
        params = this.serialize(params);
        return this.http.get(`${this.url}formaspago`, { params: this.object2Params(params) });
    }
    
    checkoutTia(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.post(`${this.url}${resource.id}/checkout_tia`, resource);
    }
    
    consultarEstadoTia(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.post(`${this.url}consultar_estado_tia`, resource);
    }
}
