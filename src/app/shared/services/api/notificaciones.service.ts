import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";
@Injectable()
export class NotificacionesService extends ApiService {
    constructor(protected http: HttpService) {
        super(http);
        this.url = 'api/notificaciones/'
    }

    noticias(): Observable<any> {
        return this.http.get(`${this.url}noticias`);
      }
      
    leidas(resource?: any): Observable<any> {
    return this.http.post(`${this.url}leidas`, resource);
    }
    
}

