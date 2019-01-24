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
}
