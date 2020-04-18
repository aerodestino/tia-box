import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { AppService } from "../../app.service";
import { Helpers } from "../../helpers";
import { CiudadesService } from "../../shared/services/api/ciudades.service";
import { PaisesService } from "../../shared/services/api/paises.service";
import { ProvinciasService } from "../../shared/services/api/provincias.service";
import { UsuariosService } from "../../shared/services/api/usuarios.service";

@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./registro-usuario.component.html",
  styles: []
})
export class RegistroUsuarioComponent implements OnInit {
  paises: any[];
  tipo_registro = 1;
  provincias: any[] = [];
  ciudades: any[] = [];
  constructor(
    public usuariosService: UsuariosService,
    public paisesService: PaisesService,
    public provinciasService: ProvinciasService,
    public ciudadesService: CiudadesService,
    public toastr: ToastsManager,
    public appService: AppService,
    public vcr: ViewContainerRef,
    public router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getPaises();
  }

  getPaises() {
    this.paisesService.getAllWithoutAuth({ status: 1 }).subscribe(paises => {
      this.paises = paises.json().data;
    });
  }

  getProvincias(pais_id) {
    this.ciudades = [];
    this.provincias = null;
    this.provinciasService
      .getAll({ pais_id: pais_id })
      .subscribe(provincias => {
        this.provincias = provincias.json().data;
      });
  }

  getCiudades(provincia_id) {
    this.ciudades = null;
    this.ciudadesService
      .getAll({ provincia_id: provincia_id })
      .subscribe(ciudades => {
        this.ciudades = ciudades.json().data;
      });
  }

  onSubmit(datosUsuario) {
    datosUsuario.origen_id = 1;
    this.appService.loadingMessage = "Registrando Usuario";
    Helpers.setLoading(true);
    this.usuariosService.signup(datosUsuario).subscribe(
      () => {
        Helpers.setLoading(false);
        this.appService.loadingMessage = "Cargando";
        this.toastr.success("Usuario Registrado");
        this.router.navigate(["/mi-casillero"]);
      },
      error => {
        this.toastr.error(error.json().error.message);
        Helpers.setLoading(false);
        this.appService.loadingMessage = "Cargando";
      }
    );
  }

  onCancel() {
    this.router.navigate(["/login"], { queryParams: { returnUrl: "" } });
  }

  onChange() {
    if (!this.tipo_registro) this.tipo_registro = 1;
    console.log(this.tipo_registro);
  }
}
