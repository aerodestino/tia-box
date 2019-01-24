import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";

@Injectable()
export class ProductoVentaService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/producto-venta/'
    }

    imprimirEtiqueta(id, params: any, responseType?: any) {
        return this.http.get(`${this.url}${id}/imprimir-etiqueta`, { params: this.object2Params(this.serialize(params)), responseType: responseType });
    }

    getKeyprov(data: any) {
        return this.http.get(`${this.url}${data.id}/proveedor/${data.inicialesProveedor}/keyprov`);
    }
}
