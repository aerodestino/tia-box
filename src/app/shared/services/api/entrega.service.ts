import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EntregaService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/entregas/'
    }

    getArticulos(id, responseType?: any) : Observable<any>{
        return this.http.get(`${this.url}${id}/articulos`,{params: this.object2Params(this.serialize(responseType))});
    }

    exportar(params: any, responseType?: any) {
        params = this.serialize(params);
        return this.http.get(`${this.url}download`, {params: this.object2Params(params),responseType: responseType});
    }

    reenviar_guia_nacional(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.post(`${this.url}reenviar_guia_nacional`, resource);
    }

    editar_guia_nacional(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.post(`${this.url}editar_guia_nacional`, resource);
    }

    create_estado_guia(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.post(`${this.url}create_estado_guia`, resource);
    }

}
