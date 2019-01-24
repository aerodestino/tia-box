import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class MediasService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/medias/'
    }
    uploadImage(resource: any): Observable<any> {
        let headers: Headers = new Headers({ 'Content-Type': undefined });
        let options: RequestOptions = new RequestOptions({ headers: headers });

        return this.http.post(this.url + 'upload', resource, options);
    }
}
