import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AppService } from "../../../app.service";
import { UsuariosService } from "../api/usuarios.service";
import { HttpService } from "../http/http.service";
import { StorageService } from "../storage/storage.service";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent }
  from '@angular/common/http'
@Injectable()
export class NoCacheHeadersInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authReq = req.clone({
            setHeaders: {
                'Cache-Control': 'no-cache',
                 Pragma: 'no-cache'
            }
        });
        return next.handle(authReq);    
    }
}

