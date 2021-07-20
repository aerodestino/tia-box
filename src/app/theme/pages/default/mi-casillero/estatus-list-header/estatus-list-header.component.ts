import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EmpresasEnvioService } from "../../../../../shared/services/api/empresas-envio.service";

@Component({
    selector: 'app-estatus-list-header',
    templateUrl: './estatus-list-header.component.html',
    styles: []
})
export class EstatusListHeaderComponent implements OnInit {
    @Input() totalEstatus;
    @Input() selection;
    @Output() exportar: EventEmitter<any> = new EventEmitter();
    constructor(public ngbModal: NgbModal) { }

    ngOnInit() {
    }

   
    onExportar() {
        this.exportar.emit();
    }

}
