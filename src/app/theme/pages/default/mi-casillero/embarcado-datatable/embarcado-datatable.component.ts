import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { BaseDatatableComponent } from "../../../../../shared/prototypes/base-datatable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EnviosService } from "../../../../../shared/services/api/envios.service";
import { Tracking } from "../../../../../shared/model/tracking.model";
import { Helpers } from "../../../../../helpers";
import { ToastsManager } from "ng2-toastr";
@Component({
    selector: 'app-embarcados-datatable',
    templateUrl: './embarcado-datatable.component.html',
    styles: []
})
export class EmbarcadoDatatableComponent extends BaseDatatableComponent implements OnInit, AfterViewInit {
    @Output() ver: EventEmitter<any> = new EventEmitter();
    @Input() url: any;
    envio: any;
    datoEmbarque=null;
    modalRef=null;
    constructor(private _script: ScriptLoaderService, public ngbModal: NgbModal, public enviosService: EnviosService,
        public toastr: ToastsManager) {
        super(ngbModal);
    }

    ngOnInit() {
        this.page = this.filters.offset + 1;
        this.registroInicialPagina =
          this.totalItems > 0 ? this.filters.offset * this.filters.limit + 1 : 0;
        this.registroFinalPagina =
          this.registroInicialPagina + this.filters.limit > this.totalItems
            ? this.totalItems
            : this.registroInicialPagina + this.filters.limit - 1;
        }

    ngAfterViewInit() {
        // this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
        //     'assets/demo/default/custom/components/datatables/base/html-table.js');
    }


    descargar(file) {
        var link = document.createElement("a");
        let url = this.url+''+file;
        link.href = URL.createObjectURL(url);
        link.download = file;
        link.click();
      }

      onVerImagenes(articulo) {
        this.ver.emit(articulo);
      }

      modalEmbarque(content, articulo) {
        Helpers.setLoading(true);
        this.datoEmbarque = articulo;
        this.modalRef = this.ngbModal.open(content);
        Helpers.setLoading(false);
    }
    
    close(){
      this.modalRef.close();
    }

}

