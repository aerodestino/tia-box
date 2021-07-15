import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { BaseDatatableComponent } from "../../../../../shared/prototypes/base-datatable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FacturacionesService } from "../../../../../shared/services/api/facturaciones.service";
import { Tracking } from "../../../../../shared/model/tracking.model";
import { Helpers } from "../../../../../helpers";
import { ToastsManager } from "ng2-toastr";
import {Big} from 'big.js';
@Component({
    selector: 'app-facturacion-datatable',
    templateUrl: './facturacion-datatable.component.html',
    styles: []
})
export class FacturacionDatatableComponent extends BaseDatatableComponent implements OnInit, AfterViewInit {
    @Output() ver: EventEmitter<any> = new EventEmitter();
    envio: any;
    pago: any;
    totalPrecio = 0;
    totalPeso = 0;
    constructor(private _script: ScriptLoaderService, public ngbModal: NgbModal,public facturacionesService: FacturacionesService,
        public toastr: ToastsManager) {
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
      this.totalPrecio = 0;
      this.totalPeso = 0;
        Helpers.setLoading(true);
        this.facturacionesService
          .getArticulos({ id: articulo })
          .subscribe(
            (dato) => {
              Helpers.setLoading(false);
             this.envio= dato.json().data;
             for(let i in this.envio){
              let peso = Big(this.envio[i].peso);
              let precio = Big(this.envio[i].precio);
              this.totalPeso = peso.plus(this.totalPeso);
              this.totalPrecio = precio.plus(this.totalPrecio);
             }
             this.ngbModal.open(modal, { size: "lg" });
            },
            error => {
              Helpers.setLoading(false);
              this.toastr.error('Ocurrió un error cargando los detalles');
            }
          );
    }

    openModal(modal) {
        this.ngbModal.open(modal);
    }

    onFormasPago(articulo, modal) {
        Helpers.setLoading(true);
        this.facturacionesService
          .getFormasPago({ id: articulo })
          .subscribe(
            (dato) => {
              Helpers.setLoading(false);
             this.pago= dato.json().data;
             this.ngbModal.open(modal, { size: "lg" });
            },
            error => {
              Helpers.setLoading(false);
              this.toastr.error('Ocurrió un error cargando los detalles');
            }
          );
    }

    onVerImagenes(articulo) {
        this.ver.emit(articulo);
    }
}

