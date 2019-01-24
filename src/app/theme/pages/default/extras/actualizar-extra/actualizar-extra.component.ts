import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import { AppService } from "../../../../../app.service";
import { ExtrasService } from "../../../../../shared/services/api/extras.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseUpdateComponent } from "../../../../../shared/prototypes/base-update";
import { ToastsManager } from "ng2-toastr";
import {Extra} from "../../../../../shared/model/extra.model";
import {Helpers} from "../../../../../helpers";

@Component({
    selector: "app-actualizar-extra",
    templateUrl: './actualizar-extra.component.html',
    styles: []
})
export class ActualizarExtraComponent implements OnInit {
    @Input() id: any;
    extra: Extra;
    @Output() updated: EventEmitter<any> = new EventEmitter();
    constructor(public appService: AppService,
                public extrasService: ExtrasService, public toastr: ToastsManager,
                public vcr: ViewContainerRef, public router: Router) {
        this.toastr.setRootViewContainerRef(vcr);
        this.appService.title = "Actualizar Extra";
    }
    ngOnInit() {
        this.getElement();
    }

    getElement() {
        this.extrasService.getById(this.id).subscribe( extra => {
            this.extra = extra.json().data;
        });
    }

    updateItem(resourceItem: any) {
        resourceItem.id = this.id;
        Helpers.setLoading(true);
        this.extrasService.update(resourceItem).subscribe(() => {
            Helpers.setLoading(false);
            this.appService.message = "Recurso Actualizado";
            this.updated.emit();
        }, (error) => {
            Helpers.setLoading(false);
            this.toastr.error(error.json().message);
        })
    }
}
