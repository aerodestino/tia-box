import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Extra } from "../../../../../shared/model/extra.model";
import { isNullOrUndefined } from "util";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppService } from "../../../../../app.service";
import {UsuariosService} from "../../../../../shared/services/api/usuarios.service";
import {User} from "../../../../../shared/model/user.model";
import { Country } from '../../../../../shared/model/country.model';
import { Province } from '../../../../../shared/model/province.model';
import { City } from '../../../../../shared/model/city.model';
import { PaisesService } from '../../../../../shared/services/api/paises.service';
import { ProvinciasService } from '../../../../../shared/services/api/provincias.service';
import { CiudadesService } from '../../../../../shared/services/api/ciudades.service';

@Component({
    selector: 'app-extra-formulario',
    templateUrl: './extra-formulario.component.html',
    styles: []
})
export class ExtraFormularioComponent implements OnInit {
    @Input() extra: Extra;
    @Output() submitForm: EventEmitter<Extra> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    public provincias =  [];
    public ciudades =   [];
    public parroquias =  [];
    public paises =  [];
    constructor(
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        public appService: AppService,
        public provinciaService: ProvinciasService,
        public ciudadService: CiudadesService,
        public paisService: PaisesService) {
        this.toastr.setRootViewContainerRef(vcr);

    }

    ngOnInit() {
        this.getPaises();
        if (isNullOrUndefined(this.extra)) {
            this.extra = new Extra();
            this.extra.usuario = new User();
            this.extra.pais = new Country();
            this.extra.provincia = new Province();
            this.extra.ciudad = new City();
            this.extra.parroquia = new City();
        }else{
            if(isNullOrUndefined(this.extra.ciudad)){
                this.extra.pais = new Country();
                this.extra.provincia = new Province();
                this.extra.ciudad = new City();
                this.extra.parroquia = new City();
                if(this.extra.usuario){
                    this.extra.pais = this.extra.usuario.pais;
                    this.extra.provincia = this.extra.usuario.provincia;
                    this.extra.ciudad = this.extra.usuario.ciudad;
                    if(this.extra.usuario.parroquia)
                        this.extra.parroquia = this.extra.usuario.parroquia;

                    this.getParroquias(this.extra.ciudad.id);
                    this.getCiudades(this.extra.provincia.id);
                    this.getProvincias(this.extra.pais.id);
                }

            }else{
                this.extra.provincia = this.extra.ciudad.provincia;
                this.extra.pais = this.extra.ciudad.provincia.pais;
                if(this.extra.ciudad.parroquia){
                    this.extra.parroquia = this.extra.ciudad;
                    this.extra.ciudad = this.extra.ciudad.ciudad_principal;
                }else{
                    this.extra.parroquia = new City();
                }
                this.getProvincias(this.extra.pais.id);
                this.getParroquias(this.extra.ciudad.id);
                this.getCiudades(this.extra.provincia.id);
            }
        }
    }


    onSubmit(extra: Extra) {
        extra.usuario_id = this.appService.user.id;
        this.submitForm.emit(extra);
    }

    getPaises() {
        this.paises = null;
        this.paisService.getAll().subscribe((data) => {
            this.paises = data.json().data;
        }, (error) => {
            console.log(error.json());
        });
    }

    getProvincias(pais_id) {
        this.provincias = null;
        this.ciudades = null;
        this.provinciaService.getAll({pais_id: pais_id}).subscribe((data) => {
            this.provincias = data.json().data;
        }, (error) => {
            console.log(error.json());
        });
    }

    getCiudades(provincia_id) {
        this.ciudades = null;
        this.ciudadService.getPrincipal({provincia_id: provincia_id}).subscribe((data) => {
            this.ciudades = data.json().data;
        }, (error) => {
            console.log(error.json());
        });
    }

    getParroquias(ciudad_id) {
        this.parroquias = null;
        this.ciudadService.getParroquiasByCiudad({ciudad_id: ciudad_id}).subscribe((data) => {
            this.parroquias = data.json().data;
        }, (error) => {
            console.log(error.json());
        });
    }
}
