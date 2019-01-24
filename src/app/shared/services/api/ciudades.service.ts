import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CiudadesService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/ciudades/'
    }

    getAll(params?: any): Observable<any> {
        if (!params)
            return this.http.getWithoutAuthHeader(`${this.url}todos`);
        params = this.serialize(params);
        return this.http.getWithoutAuthHeader(`${this.url}todos`, { params: this.object2Params(params) });
    }
}
