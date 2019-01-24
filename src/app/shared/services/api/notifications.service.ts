import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {ApiService} from "./api.service";

@Injectable()
export class NotificationsService extends ApiService{

    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/notifications/'
    }

    readAll() {
        return this.http.put(this.url, {});
    }

    read(id) {
        return this.http.put(`${this.url}${id}`, {});
    }
}
