import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SkumastersService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/marketplace/skumasters/'
    }
    traducir(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.put(`${this.url}traducir`, resource);
    }
    verificar(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.put(`${this.url}verificar`, resource);
    }
    remapear(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.put(`${this.url}remapear`, resource);
    }
    predecir(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.put(`${this.url}predict`, resource);
    }
    autocompletar(resource: any): Observable<any> {
        resource = super.serialize(resource);
        return this.http.put(`${this.url}autocompletar`, resource);
    }
    agregarVariacion(sku_padre, sku_master) {
        sku_master = this.serialize(sku_master);
        return this.http.put(`${this.url}${sku_padre}/variacion`, sku_master);
    }
    getVariaciones(id) {
        return this.http.get(`${this.url}variaciones/${id}`);
    }
    getAtributos(id) {
        return this.http.get(`${this.url}atributos/${id}`);
    }
    agregarAtributo(id, resource) {
        return this.http.put(`${this.url}${id}/atributo`, resource);
    }
    actualizarCategoria(id, resource) {
        return this.http.put(`${this.url}${id}/categoria`, resource);
    }

}
