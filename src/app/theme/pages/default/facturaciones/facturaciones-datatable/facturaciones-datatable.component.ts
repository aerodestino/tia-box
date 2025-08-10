import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScriptLoaderService} from '../../../../../_services/script-loader.service';
import {BaseDatatableComponent} from "../../../../../shared/prototypes/base-datatable";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FacturacionesService} from "../../../../../shared/services/api/facturaciones.service";
import {ToastsManager} from "ng2-toastr";
import {Helpers} from "../../../../../helpers";

@Component({
    selector: 'app-facturaciones-datatable',
    templateUrl: './facturaciones-datatable.component.html',
    styles: []
})
export class FacturacionesDatatableComponent extends BaseDatatableComponent implements OnInit, AfterViewInit {
    documento: null;
    articulos: any[];
    scriptTia: string;
    urlReturn: string;
    public resource: any;
    public resourceData: any;
    @Output() verCupos: EventEmitter<any> = new EventEmitter();


    constructor(
        private _script: ScriptLoaderService,
        public ngbModal: NgbModal,
        private facturacioneservice: FacturacionesService,
        private toastr: ToastsManager,
    ) {
        super(ngbModal);
    }

    ngOnInit() {
        this.page = this.filters.offset + 1;
        this.registroInicialPagina = this.filters.offset * this.filters.limit + 1;
        this.registroFinalPagina = this.registroInicialPagina + this.filters.limit > this.totalItems ? this.totalItems : this.registroInicialPagina + this.filters.limit - 1;
    }

    ngAfterViewInit() {

    }

    onViewItems(articulos, modal) {
        this.articulos = articulos;
        this.ngbModal.open(modal, {size: "lg"});
    }

 
      onPagarTia(id,costo, content) {
        Helpers.setLoading(true);
        this.facturacioneservice.checkoutTia({id:id,costo:costo}).subscribe( (data) => {
            Helpers.setLoading(false);
            var checkoutId = data.json().data;
            this.scriptTia = 'https://test.oppwa.com/v1/paymentWidgets.js?checkoutId='+checkoutId.id;
            $('body').append('<script id="pagoTia" src="'+this.scriptTia+'"></script>');
            this.urlReturn = window.location + '/estadopago';
            this.ngbModal.open(content);
        }, error => {
            Helpers.setLoading(false);
            if(error.json().data)
                this.toastr.error(error.json().data.error);
            if(error.json().error)
                this.toastr.error(error.json().error.message);
            
        });
      }
}
