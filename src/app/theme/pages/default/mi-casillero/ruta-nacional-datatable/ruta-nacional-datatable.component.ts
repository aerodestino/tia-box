import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { BaseDatatableComponent } from "../../../../../shared/prototypes/base-datatable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EntregaService } from "../../../../../shared/services/api/entrega.service";
import { Tracking } from "../../../../../shared/model/tracking.model";
import { Helpers } from "../../../../../helpers";
import { ToastsManager } from "ng2-toastr";
import {Big} from 'big.js';
@Component({
    selector: 'app-ruta-nacional-datatable',
    templateUrl: './ruta-nacional-datatable.component.html',
    styles: []
})
export class RutaNacionalDatatableComponent extends BaseDatatableComponent implements OnInit, AfterViewInit {
    @Output() ver: EventEmitter<any> = new EventEmitter();
    envio: any;
    totalPrecio = 0;
    totalPeso = 0;
    ver_usuario = ''; 
    modalRef = null;
    constructor(private _script: ScriptLoaderService, public ngbModal: NgbModal,public entregaService: EntregaService,
        public toastr: ToastsManager) {
        super(ngbModal);
    }

    ngOnInit() {
        this.page = this.filters.offset + 1;
        this.registroInicialPagina = this.totalItems > 0 ? this.filters.offset * this.filters.limit + 1 : 0;
        this.registroFinalPagina = this.registroInicialPagina + this.filters.limit > this.totalItems ? this.totalItems : this.registroInicialPagina + this.filters.limit - 1;
    }

    ngAfterViewInit() {
      /*   this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/demo/default/custom/components/datatables/base/html-table.js'); */
    }

    onVer(articulo, modal) {
      this.totalPrecio = 0;
      this.totalPeso = 0;
        Helpers.setLoading(true);
        this.entregaService
          .getArticulos(articulo)
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
             this.modalRef = this.ngbModal.open(modal, { size: "lg" });
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

    
    onNotas(content, notas) {
      this.ver_usuario = '';
      Helpers.setLoading(true);
      this.ver_usuario = notas;
      this.modalRef = this.ngbModal.open(content);
      Helpers.setLoading(false);
    }

    close(){
      this.modalRef.close();
    }
}

