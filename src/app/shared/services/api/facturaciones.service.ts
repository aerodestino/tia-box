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
}
