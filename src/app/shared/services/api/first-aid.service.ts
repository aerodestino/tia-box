import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";

@Injectable()
export class FirstAidService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/marketplace/skumasters/first-aid'
    }
}
