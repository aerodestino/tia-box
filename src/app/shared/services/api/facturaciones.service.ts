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
}
