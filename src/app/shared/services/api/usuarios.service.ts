import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../http/http.service";
import { ApiService } from "./api.service";
@Injectable()
export class UsuariosService extends ApiService {
  constructor(protected http: HttpService) {
    super(http);
    this.url = "api/usuarios/";
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.url}perfil`);
  }

  signup(resource?: any): Observable<any> {
    resource = this.serialize(resource);
    return this.http.postWithoutAuthHeader(`${this.url}register`, resource);
  }

  cambiarPassword(resource: any): Observable<any> {
    resource = this.serialize(resource);
    return this.http.put(`${this.url}password`, resource);
  }

  cambiarImagen(resource?: any): Observable<any> {
    return this.http.post(`${this.url}perfil/avatar`, resource);
  }

  subirDocumento(resource?: any): Observable<any> {
    return this.http.post(`${this.url}perfil/identidad`, resource);
  }

  editarPerfil(resource: any): Observable<any> {
    resource = this.serialize(resource);
    return this.http.put(`${this.url}perfil`, resource);
  }

  getPermissions(): Observable<any> {
    return this.http.get(`${this.url}permissions`);
  }

  allUsuarios(params?): Observable<any> {
    if (!params)
    return this.http.get(`${this.url}all_usuarios`);
return this.http.get(`${this.url}all_usuarios`, {params: this.object2Params(this.serialize(params))});
}

}
