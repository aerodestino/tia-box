import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AppService } from "../../../app.service";
import { UsuariosService } from "../api/usuarios.service";
import { HttpService } from "../http/http.service";
import { StorageService } from "../storage/storage.service";

@Injectable()
export class AuthService {
  constructor(
    protected http: HttpService,
    public appService: AppService,
    public userService: UsuariosService,
    public storageService: StorageService
  ) {}

  login(user: string, password: string): Observable<any> {
    let body = {
      grant_type: "password",
      client_id: "1_interface",
      client_secret: "4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k",
      username: user,
      password: password,
      path: window.location.href
    };
    return this.http.post("oauth/v2/token", body);
  }

  resetPassword(email) {
    let params = { email: email, path:window.location.href };
    return this.http.getWithoutAuthHeader("api/password/recuperar", {
      params: params
    });
  }

  getUser(): string {
    return localStorage.getItem("user");
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null && this.getUser() !== undefined;
  }

  logout() {
    localStorage.removeItem("user");
  }
}
