import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EnviosService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/envios/'
    }
}
