import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { ResponseContentType } from "@angular/http";
import { log } from "util";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsuariosService} from "../../../../shared/services/api/usuarios.service";
import {MailService} from "../../../../shared/services/api/mail.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './contacto.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: []
})
export class ContactoComponent implements OnInit {
    correo: any = {
        body: "",
        from: "",
        nombre: "",
        telefono: "",
        subject: "",
    };
    usuario: any;
    constructor(public router: Router,
                public mailService: MailService,
                public usuariosService: UsuariosService,
                public toastr: ToastsManager,
                public vcr: ViewContainerRef,) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        this.usuariosService.getProfile().subscribe( (usuario) => {
           this.usuario = usuario.json().data;
           this.correo.nombre = this.usuario.full_name;
           this.correo.from = this.usuario.email;
           this.correo.to = 'info@box593.com';
        });
    }

    onEnviar() {
        this.mailService.contact(this.correo).subscribe( () => {
           this.toastr.success("Su mensaje ha sido enviado. Lo revisaremos y le responderemos pronto");
        });
    }

}
