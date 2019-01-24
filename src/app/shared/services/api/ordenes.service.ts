import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class OrdenesService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/ordenes/'
    }

    cancelar(id: string | number): Observable<any> {
        return this.http.put(`${this.url}${id}/estado`, { status: 'Cancelada' });
    }

    importOrdenes(resource: any): Observable<any> {
        return this.http.post(this.url, resource);
    }

    agregarEnvio(resource: any): Observable<any> {
        return this.http.post(`${this.url}${resource.id}/envio`, resource.envio);
    }

    actualizarEnvio(resource: any): Observable<any> {
        return this.http.put(`${this.url}${resource.id}/envio/${resource.envio.id}`, resource.envio);
    }


    exportarComprasPendientes(params: any, responseType?: any) {
        return this.http.get(`${this.url}exportar-compras-pendientes`, { params: this.object2Params(this.serialize(params)), responseType: responseType });
    }
    getProductos(id) {
        return this.http.get(`${this.url}${id}/productos`);
    }

    getPorEstado(params: any): Observable<any> {
        params = this.serialize(params);
        return this.http.get(`${this.url}estado`, { params: this.object2Params(params) });
    }

    getOrden(id): Observable<any> {
        return this.http.get(`${this.url}${id}/show`);
    }

    getSinConsolidar(params: any) {
        params = this.serialize(params);
        return this.http.get(`${this.url}sin-consolidar`, { params: this.object2Params(params) });
    }

    entregar(resource: any): Observable<any> {
        return this.http.put(`${this.url}sin-consolidar`, resource);
    }

    actualizarEstadoProducto(resource: any): Observable<any> {
        return this.http.put(`${this.url}estado/productos`, resource);
    }

    enviar(resource: any): Observable<any> {
        return this.http.put(`${this.url}${resource.id}/estado/productos/por-enviar`, resource);
    }


    importPorEnviar(resource: any): Observable<any> {
        return this.http.post(`${this.url}por-enviar/importar`, resource);
    }

    exportar(params: any, responseType?: any) {
        return this.http.get(`${this.url}exportar`, { params: this.object2Params(this.serialize(params)), responseType: responseType });
    }

    importGuias(resource: any): Observable<any> {
        return this.http.post(`${this.url}guias`, resource);
    }

    imprimirGuias(ventaId, responseType?: any) {
        return this.http.get(`${this.url}${ventaId}/imprimir-guia`, { responseType: responseType });
    }

}
