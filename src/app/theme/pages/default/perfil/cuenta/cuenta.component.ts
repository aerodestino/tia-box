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
import { City } from "../../../../../shared/model/city.model";
@Component({
    selector: "app-cuenta",
    templateUrl: './cuenta.component.html',
    styles: []
})
export class CuentaComponent implements OnInit {
    paises: any[];
    provincias: any[] = [];
    ciudades: any[] = [];
    default= 8;
    message: any='';
    parroquias: any[] = [];
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
        if (!this.usuario.ciudad) this.usuario.ciudad = new City();
        this.getPaises();
        if(this.usuario.pais.id)
             this.getProvincias(this.usuario.pais.id);
        else
            this.getProvincias(8);   
            
        if(this.usuario.provincia && this.usuario.provincia.id ) 
            this.getCiudades(this.usuario.provincia.id);
        if(this.usuario.ciudad.id)
            this.getParroquias(this.usuario.ciudad.id);
    }

    getPaises() {
        this.paisesService.getAllWithoutAuth().subscribe(paises => {
            this.paises = paises.json().data;
        })
    }

    getParroquias(ciudad_id) {
        this.parroquias = null;
        this.ciudadesService.getParroquiasByCiudad({ciudad_id: ciudad_id}).subscribe((data) => {
            this.parroquias = data.json().data;
            if (!this.usuario.parroquia)
                this.usuario.parroquia = new City();
        }, (error) => {
            console.log(error.json());
        });
    }

    getProvincias(pais_id) {
        this.provinciasService.getAll({ pais_id: pais_id }).subscribe(provincias => {
            this.provincias = provincias.json().data;
        });
    }

    getCiudades(provincia_id) {
        this.ciudadesService.getPrincipal({provincia_id: provincia_id}).subscribe(ciudades => {
            this.ciudades = ciudades.json().data;
        });
    }

    onSubmit(datosUsuario) {
        this.appService.loadingMessage = "Actualizando datos de perfil";
        datosUsuario.email = this.usuario.email;
        datosUsuario.numero_identidad = this.usuario.numero_identidad;
        Helpers.setLoading(true);
        this.usuariosService.editarPerfil(datosUsuario).subscribe(() => {
            this.appService.loadingMessage = "Cargando";
            Helpers.setLoading(false);
            this.message="Datos Actualizados";
        }, error => {
            this.message= error.json().error.message;
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
