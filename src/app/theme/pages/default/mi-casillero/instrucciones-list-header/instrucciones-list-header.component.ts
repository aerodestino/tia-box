import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EmpresasEnvioService } from "../../../../../shared/services/api/empresas-envio.service";

@Component({
    selector: 'app-instrucciones-list-header',
    templateUrl: './instrucciones-list-header.component.html',
    styles: []
})
export class InstruccionesListHeaderComponent implements OnInit {
    @Input() totalInstrucciones;
    @Input() selection;
    @Input() puedeEntrega;
    @Output() exportar: EventEmitter<any> = new EventEmitter();
    @Output() entrega: EventEmitter<any> = new EventEmitter();
    constructor(public ngbModal: NgbModal) { }

    ngOnInit() {
    }

    onEntrega() {
        this.entrega.emit();
    }
    onExportar() {
        this.exportar.emit();
    }


}
