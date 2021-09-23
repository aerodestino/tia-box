import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ArancelesService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/aranceles/'
    }

    categoria(): Observable<any> {
        let dato = this.serialize({web:true});
        return this.http.get(`${this.url}categoria`, { params: this.object2Params(dato) });
    }
}
