import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import { AppService } from "../../../../../app.service";
import { Extra } from "../../../../../shared/model/extra.model";
import { ExtrasService } from "../../../../../shared/services/api/extras.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-crear-extra",
    templateUrl: './crear-extra.component.html',
    styles: []
})
export class CrearExtraComponent implements OnInit {
    returnUrl: string;
    @Output() creado: EventEmitter<any> = new EventEmitter();
    constructor(
        public appService: AppService,
        public extrasService: ExtrasService,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        public activatedRoute: ActivatedRoute,
        public router: Router
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.appService.title = "Crear Extra";
    }
    ngOnInit() {
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    }

    crearExtra(extra: Extra) {
        this.extrasService.create(extra).subscribe(() => {
            this.toastr.success("Extra creado");
            this.creado.emit();
        }, (error) => {
            this.toastr.error(error.json().message);
        })
    }

    cancel() {
        this.router.navigate([this.returnUrl]);
    }
}
