import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../auth/auth.service";
import { HttpService } from "../http/http.service";

@Injectable()
export class UserService {
  constructor(
    protected authService: AuthService,
    protected http: HttpService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.authService.login(username, password);
  }
  logout() {
    this.authService.logout();
  }
}
