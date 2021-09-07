import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Extra } from "../../../../../shared/model/extra.model";
import { isNullOrUndefined } from "util";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppService } from "../../../../../app.service";
import {UsuariosService} from "../../../../../shared/services/api/usuarios.service";
import {User} from "../../../../../shared/model/user.model";

@Component({
    selector: 'app-extra-formulario',
    templateUrl: './extra-formulario.component.html',
    styles: []
})
export class ExtraFormularioComponent implements OnInit {
    @Input() extra: Extra;
    @Output() submitForm: EventEmitter<Extra> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    constructor(
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        public appService: AppService) {
        this.toastr.setRootViewContainerRef(vcr);

    }

    ngOnInit() {
        if (isNullOrUndefined(this.extra)) {
            this.extra = new Extra();
            this.extra.usuario = new User();
        }
    }


    onSubmit(extra: Extra) {
        extra.usuario_id = this.appService.user.id;
        this.submitForm.emit(extra);
    }

  
}
