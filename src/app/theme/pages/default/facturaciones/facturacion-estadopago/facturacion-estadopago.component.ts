import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseListComponent } from "../../../../../shared/prototypes/base-list";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { AppService } from "../../../../../app.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Helpers } from "../../../../../helpers";
import { FacturacionesService } from '../../../../../shared/services/api/facturaciones.service';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './facturacion-estadopago.component.html',
    styles: []
})
export class FacturacionEstadoPagoComponent extends BaseListComponent implements OnInit {
    checkoutId:string = '';
    resourcePath = '';
    message = '';
    constructor(
        public facturacionService: FacturacionesService,
        public router: Router,
        public ngbModal: NgbModal,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        public appService: AppService,
        public activatedRoute: ActivatedRoute
    ) {
        super(router, toastr, vcr, appService);
        this.url = '/facturaciones/estadopago';
        this.resourceService = facturacionService;
        this.appService.title = "Estado pago facturación";
        this.checkoutId = this.activatedRoute.snapshot.queryParams['id'];
        this.resourcePath = this.activatedRoute.snapshot.queryParams['resourcePath'];
    }

    ngOnInit() {
        this.onConsultarEstadoTia(this.checkoutId);
    }
    onConsultarEstadoTia(checkoutId) {
        Helpers.setLoading(true);
        this.facturacionService.consultarEstadoTia({checkoutId:checkoutId, url: this.resourcePath}).subscribe( (data) => {
            Helpers.setLoading(false);
            this.message = 'Pago enviado correctamente.'
            this.toastr.success("Estado consultado y enviado");
        }, error => {
            this.message = 'Error al enviar el pago.'
            Helpers.setLoading(false);
            if(error.json().data)
                this.toastr.error(error.json().data.error);
            if(error.json().error)
                this.toastr.error(error.json().error.message);
        });
    }
     onVolver() {
        this.router.navigate(['/facturas']);
    }
}
