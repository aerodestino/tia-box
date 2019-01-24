import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ArticulosService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/articulos/'
    }

    getPorEstado(params: any): Observable<any> {
        params = this.serialize(params);
        return this.http.get(`${this.url}estado`, { params: this.object2Params(params) });
    }

    subirFactura(id, resource: any): Observable<any> {
        return this.http.post(`${this.url}${id}/factura`, resource);
    }
    embarcar(resource: any): Observable<any> {
        return this.http.put(`${this.url}embarcar`, resource);
    }
    consolidar(resource: any): Observable<any> {
        return this.http.put(`${this.url}consolidar`, resource);
    }

}
