import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ComprasService } from "../../../../../shared/services/api/compras.service";
import { BaseListComponent } from "../../../../../shared/prototypes/base-list";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { AppService } from "../../../../../app.service";
import { ProductoVentaService } from "../../../../../shared/services/api/producto-venta.service";
import { ProductoVenta } from "../../../../../shared/model/producto-venta.model";
import { OrdenesService } from "../../../../../shared/services/api/ordenes.service";
import { ResponseContentType } from "@angular/http";
import { ExcelWorkService } from "../../../../../shared/services/excel/excel-work.service";
import { Helpers } from "../../../../../helpers";
import { BodegasService } from "../../../../../shared/services/api/bodegas.service";
import { LogisticasService } from "../../../../../shared/services/api/logisticas.service";
import { log } from "util";
import { UsuariosService } from "../../../../../shared/services/api/usuarios.service";
import { ArticulosService } from "../../../../../shared/services/api/articulos.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './perfil-lista.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: []
})
export class PerfilListaComponent extends BaseListComponent implements OnInit {
    usuario: any;
    extra: any;
    documento = null;
    imagenNueva = null;
    imagenVieja = null;
    inputFile = null;
    constructor(public router: Router,
        public ngbModal: NgbModal,
        public toastr: ToastsManager,
        public usuariosService: UsuariosService,
        public vcr: ViewContainerRef,
        public appService: AppService) {
        super(router, toastr, vcr, appService);
        this.url = '/mi-perfil';
        this.appService.title = "Perfil de Usuario"
    }

    ngOnInit() {
        this.getUsuario();
    }

    getUsuario() {
        this.usuariosService.getProfile().subscribe(usuario => {
            this.appService.user = usuario.json().data;
            this.usuario = usuario.json().data;
            console.log(this.usuario);
        }, error => {
            this.toastr.error(error.json().error.message);
        });
    }

    onPreviewImage(event) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        if (event.target.files && event.target.files[0]) {
            this.imagenNueva = event.target.files[0];
            console.log(this.imagenNueva);
            let reader = new FileReader();

            reader.onload = (event1: any) => {
                this.imagenVieja = this.usuario.avatar.web_url;
                this.usuario.avatar.web_url = event1.target.result;
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    onCancelarCambioImagen() {
        this.usuario.avatar.web_url = this.imagenVieja;
        this.imagenNueva = this.imagenVieja = null;
        this.inputFile = null;
    }

    onCambiarImagen() {
        console.log(this.imagenNueva);
        const formData: FormData = new FormData();
        formData.append('avatar', this.imagenNueva, this.imagenNueva.name);
        Helpers.setLoading(true);
        this.usuariosService.cambiarImagen(formData).subscribe((res) => {
            this.toastr.success("Imagen Cambiada");
            console.log(res.json().data);
            this.imagenNueva = this.imagenVieja = null;
            Helpers.setLoading(false);
        }, error => {
            Helpers.setLoading(false);
            this.toastr.error(error.json().error.message);
        });

    }

    onSubirDocumento(event) {
        if (event.target.files && event.target.files[0]) {
            this.documento = event.target.files[0];

            const formData: FormData = new FormData();
            formData.append('identidad', this.documento, this.documento.name);
            Helpers.setLoading(true);
            this.usuariosService.subirDocumento(formData).subscribe((res) => {

                Helpers.setLoading(false);
                this.toastr.success("Documento Guardado");
            }, error => {
                Helpers.setLoading(false);
                this.toastr.error(error.json().error.message);
            });
        }
    }

    verCupos(usuario, modal) {
        this.extra = usuario;
        this.ngbModal.open(modal);
    }
}
