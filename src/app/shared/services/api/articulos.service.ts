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

    getImagenes(params: any): Observable<any> {
        params = this.serialize(params);
        return this.http.get(`${this.url}imagen`, { params: this.object2Params(params) });
    }

    embarcarModal(params: any): Observable<any> {
        params = this.serialize(params);
        return this.http.get(`${this.url}datosEmbarcar`, { params: this.object2Params(params) });
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

    subirFacturaMasiva(resource: any): Observable<any> {
        return this.http.post(`${this.url}facturamasiva`, resource);
    }

    guardarPrecio(id, precio:any): Observable<any> {
        return this.http.put(`${this.url}${id}/costo`, super.serialize(precio));
    }

    listEmbaque(params) {
        if (!params)
        return this.http.get(`${this.url}listaEmbarque`);
         params = this.serialize(params);
         return this.http.get(`${this.url}listaEmbarque`, { params: this.object2Params(params) });   
    }

    exportar(params: any, responseType?: any) {
        params = this.serialize(params);
        return this.http.get(`${this.url}download`, {params: this.object2Params(params),responseType: responseType});
    }

    exportarEstatus(params: any, responseType?: any) {
        params = this.serialize(params);
        return this.http.get(`${this.url}downloadEstatus`, {params: this.object2Params(params),responseType: responseType});
    }

    dv(params: any, responseType?: any) {
        params = this.serialize(params);
        return this.http.get(`${this.url}dv`, {params: this.object2Params(params),responseType: responseType});
    }

    declaracionValores(id,resource: any) {
        resource = this.serialize(resource);
        return this.http.post(`${this.url}${id}/declaracion`, resource);
        }

    declaracionValoresMasiva(resource: any) {
        resource = this.serialize(resource);
        return this.http.post(`${this.url}declaracionmasiva`, resource);
        }

    retirarModal(params: any): Observable<any> {
        params = this.serialize(params);
        return this.http.get(`${this.url}datosRetirar`, { params: this.object2Params(params) });
    }

    retirar(resource: any) {
        resource = this.serialize(resource);
        return this.http.post(`${this.url}retirarweb`, resource);
        }
}
