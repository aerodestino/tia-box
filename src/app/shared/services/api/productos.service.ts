import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProductosService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/marketplace/productos/'
    }
    publicarMLMx(resource?: any): Observable<any> {
        resource = this.serialize(resource);
        return this.http.post(`${this.url}publicar/ml`, resource);
    }

    getComparaciones(id): Observable<any> {
        return this.http.get(`${this.url}comparaciones/${id}`);
    }

    getPublicaciones(id): Observable<any> {
        return this.http.get(`${this.url}publicaciones/${id}`);
    }
}
