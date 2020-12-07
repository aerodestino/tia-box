import {Component, EventEmitter, OnInit, Output, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import { FacturacionesService } from "../../../../../shared/services/api/facturaciones.service";
import { BaseListComponent } from "../../../../../shared/prototypes/base-list";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { AppService } from "../../../../../app.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './facturaciones-lista.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: []
})
export class FacturacionesListaComponent extends BaseListComponent implements OnInit {
    modalRef = null;
    id: any;
    constructor(
        public facturacionesService: FacturacionesService,
        public ngbModal: NgbModal,
        public router: Router,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        public appService: AppService
    ) {
        super(router, toastr, vcr, appService);
        this.url = '/facturaciones';
        this.resourceService = facturacionesService;
        this.appService.title = "LISTADO";
        this.filters.user_id = this.appService.user.id;
        this.filters.web = true;
    }

    ngOnInit() {
        super.getData();
    }


}
