import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";

@Injectable()
export class MercadoLibreService extends ApiService {
    public plataformaId = 1;
    constructor(protected http: HttpService) {
        super(http);
        this.url = `api/mercadolibre/${this.plataformaId}/ordenes/`;
    }
}
