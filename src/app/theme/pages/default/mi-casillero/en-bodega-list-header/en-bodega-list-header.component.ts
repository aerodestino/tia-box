import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EmpresasEnvioService } from "../../../../../shared/services/api/empresas-envio.service";

@Component({
    selector: 'app-en-bodega-list-header',
    templateUrl: './en-bodega-list-header.component.html',
    styles: []
})
export class EnBodegaListHeaderComponent implements OnInit {
    @Output() consolidar: EventEmitter<any> = new EventEmitter();
    @Output() embarcar: EventEmitter<any> = new EventEmitter();
    constructor(public ngbModal: NgbModal) { }

    ngOnInit() {
    }

    onEmbarcar() {
        this.embarcar.emit();
    }

    onConsolidar() {
        this.consolidar.emit();
    }

}
