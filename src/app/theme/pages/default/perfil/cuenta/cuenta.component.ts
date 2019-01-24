import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { UsuariosService } from "../../../../../shared/services/api/usuarios.service";
import { PaisesService } from "../../../../../shared/services/api/paises.service";
import { ProvinciasService } from "../../../../../shared/services/api/provincias.service";
import { CiudadesService } from "../../../../../shared/services/api/ciudades.service";
import { AppService } from "../../../../../app.service";
import { Helpers } from "../../../../../helpers";
import { Province } from "../../../../../shared/model/province.model";

@Component({
    selector: "app-cuenta",
    templateUrl: './cuenta.component.html',
    styles: []
})
export class CuentaComponent implements OnInit {
    paises: any[];
    provincias: any[] = [];
    ciudades: any[] = [];
    @Input() usuario: any;
    @Output() verCupos: EventEmitter<any> = new EventEmitter();
    constructor(public usuariosService: UsuariosService,
        public paisesService: PaisesService,
        public provinciasService: ProvinciasService,
        public ciudadesService: CiudadesService,
        public toastr: ToastsManager,
        public appService: AppService,
        public vcr: ViewContainerRef,
        public router: Router) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        if (!this.usuario.provincia) this.usuario.provincia = new Province();
        this.getPaises();
        this.getProvincias(this.usuario.pais.id);
        this.getCiudades(this.usuario.provincia.id);
    }

    getPaises() {
        this.paisesService.getAllWithoutAuth().subscribe(paises => {
            this.paises = paises.json().data;
        })
    }

    getProvincias(pais_id) {
        this.provinciasService.getAll({ pais_id: pais_id }).subscribe(provincias => {
            this.provincias = provincias.json().data;
        });
    }

    getCiudades(provincia_id) {
        this.ciudadesService.getAll({provincia_id: provincia_id}).subscribe(ciudades => {
            this.ciudades = ciudades.json().data;
        });
    }

    onSubmit(datosUsuario) {
        this.appService.loadingMessage = "Actualizando datos de perfil";
        datosUsuario.email = this.usuario.email;
        datosUsuario.numero_identidad = this.usuario.numero_identidad;
        Helpers.setLoading(true);
        this.usuariosService.editarPerfil(datosUsuario).subscribe(() => {
            Helpers.setLoading(false);
            this.appService.loadingMessage = "Cargando";
            this.toastr.success("Datos Actualizados");
        }, error => {
            this.toastr.error(error.json().error.message);
            Helpers.setLoading(false);
            this.appService.loadingMessage = "Cargando";
        });
    }

    onVerCupos() {
        this.verCupos.emit(this.usuario);
    }

    onCancel() {

    }


}
