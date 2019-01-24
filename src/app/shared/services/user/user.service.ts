import { Injectable } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Http } from "@angular/http";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

    constructor(protected authService: AuthService, protected http: HttpService) { }

    login(username: string, password: string): Observable<any> {
        return this.authService.login(username, password);
    }
    logout() {
        this.authService.logout();
    }


}
