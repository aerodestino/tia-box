import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EmpresasEnvioService } from "../../../../../shared/services/api/empresas-envio.service";

@Component({
    selector: 'app-en-bodega-list-header',
    templateUrl: './en-bodega-list-header.component.html',
    styles: []
})
export class EnBodegaListHeaderComponent implements OnInit {
    @Input() totalEnBodega;
    @Input() selection;
    @Input() puedeDV;
    @Input() puedeFactura;
    @Input() consolidarPaquete;
    @Input() enviarPaquete;
    @Input() retirarPaquete;
    @Output() DVMasiva: EventEmitter<any> = new EventEmitter();
    @Output() exportar: EventEmitter<any> = new EventEmitter();
    @Output() consolidar: EventEmitter<any> = new EventEmitter();
    @Output() embarcar: EventEmitter<any> = new EventEmitter();
    @Output() retirar: EventEmitter<any> = new EventEmitter();
    @Output() facturaMasiva: EventEmitter<any> = new EventEmitter();
    constructor(public ngbModal: NgbModal) { }

    ngOnInit() {
    }

    onEmbarcar() {
        this.embarcar.emit();
    }

    onRetirar() {
        this.retirar.emit();
    }

    onConsolidar() {
        this.consolidar.emit();
    }

    onFactura() {
        this.facturaMasiva.emit();
    }

    onExportar() {
        this.exportar.emit();
    }

    onDV() {
        this.DVMasiva.emit();
    }
}
