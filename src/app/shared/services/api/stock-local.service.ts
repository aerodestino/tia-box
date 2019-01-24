import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class StockLocalService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/stock-local/'
    }

    importar(resource): Observable<any> {
        resource = this.serialize(resource);
        return this.http.post(`${this.url}importar`, resource);
    }

}
