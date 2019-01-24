import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ExtrasService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/usuarios-extra/'
    }
    subirDocumento(id, resource?: any): Observable<any> {
        return this.http.post(`${this.url}${id}/identidad`, resource);
    }
}
