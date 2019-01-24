import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class MailService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/mails/'
    }
    contact(resource: any): Observable<any> {
        return this.http.post(this.url + 'contact', resource);
    }
}
