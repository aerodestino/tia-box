import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PaisesService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/paises/'
    }

    getAllWithoutAuth(params?: any): Observable<any> {
        if (!params)
            return this.http.getWithoutAuthHeader(`${this.url}todos`);
        params = this.serialize(params);
        return this.http.getWithoutAuthHeader(`${this.url}todos`, { params: this.object2Params(params) });
    }

}
