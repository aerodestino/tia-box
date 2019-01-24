import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { BaseDetallesComponent } from "../../../../shared/prototypes/base-detalles";
import { AppService } from "../../../../app.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotificacionesService } from "../../../../shared/services/api/notificaciones.service";
import {PreguntasService} from "../../../../shared/services/api/preguntas.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './preguntas.component.html',
    styles: []
})
export class PreguntasComponent  implements OnInit {
    preguntas: any[];
    constructor(public appService: AppService, public ngbModal: NgbModal,
                public preguntasService: PreguntasService,
                public activatedRoute: ActivatedRoute,
                public toastr: ToastsManager,
                public vcr: ViewContainerRef, public router: Router) {
        this.toastr.setRootViewContainerRef(vcr);

    }
    ngOnInit() {
        this.getPreguntas();
    }

    getPreguntas() {
        this.preguntasService.list().subscribe( preguntas => {
           this.preguntas = preguntas.json().data.results;
        });
    }

    selectPregunta(pregunta) {
        this.preguntas.forEach( pr => {
            if(pr.id != pregunta.id)
                pr.selected = false;
        });
        pregunta.selected = !pregunta.selected;
    }
}
