import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { BaseDetallesComponent } from "../../../../shared/prototypes/base-detalles";
import { AppService } from "../../../../app.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotificacionesService } from "../../../../shared/services/api/notificaciones.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './notificacion.component.html',
    styles: []
})
export class NotificacionComponent extends BaseDetallesComponent implements OnInit {

    constructor(public appService: AppService, public ngbModal: NgbModal,
        public activatedRoute: ActivatedRoute,
        public toastr: ToastsManager, public notificacionesService: NotificacionesService,
        public vcr: ViewContainerRef, public router: Router) {
        super(activatedRoute, toastr, vcr, appService, router, ngbModal);
        this.toastr.setRootViewContainerRef(vcr);
        this.resource = this.notificacionesService;
        this.appService.title = "DETALLES";
        activatedRoute.params.subscribe(params => {
            this.id = params['id'];
            super.getElement();
        });
    }
    ngOnInit() {

    }
}
