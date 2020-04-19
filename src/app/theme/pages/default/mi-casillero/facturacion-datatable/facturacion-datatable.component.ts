import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { BaseDatatableComponent } from "../../../../../shared/prototypes/base-datatable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TrackingsService } from "../../../../../shared/services/api/trackings.service";
import { Tracking } from "../../../../../shared/model/tracking.model";

@Component({
    selector: 'app-facturacion-datatable',
    templateUrl: './facturacion-datatable.component.html',
    styles: []
})
export class FacturacionDatatableComponent extends BaseDatatableComponent implements OnInit, AfterViewInit {
    @Output() ver: EventEmitter<any> = new EventEmitter();
    envio: any;
    constructor(private _script: ScriptLoaderService, public ngbModal: NgbModal) {
        super(ngbModal);
    }

    ngOnInit() {
        //console.log(this.data);
        this.page = this.filters.offset + 1;
        this.registroInicialPagina = this.totalItems > 0 ? this.filters.offset * this.filters.limit + 1 : 0;
        this.registroFinalPagina = this.registroInicialPagina + this.filters.limit > this.totalItems ? this.totalItems : this.registroInicialPagina + this.filters.limit - 1;
        //console.log(this.filters.offset, this.filters.limit, this.totalItems, this.registroInicialPagina, this.registroFinalPagina);
    }

    ngAfterViewInit() {
        // this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
        //     'assets/demo/default/custom/components/datatables/base/html-table.js');
    }

    onVer(articulo, modal) {
        this.envio = articulo;
        this.ngbModal.open(modal, {size: "lg"});
    }

    openModal(modal) {
        this.ngbModal.open(modal);
    }

    onVerImagenes(articulo) {
        this.ver.emit(articulo);
    }
}

