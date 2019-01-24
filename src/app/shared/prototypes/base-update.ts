import { EventEmitter, Input, OnInit, Output, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { Helpers } from "../../helpers";
import { AppService } from "../../app.service";
export abstract class BaseUpdateComponent implements OnInit {
    public id: string | number;
    public resource: any;
    public resourceData: any;
    public returnUrl: string;
    constructor(public activatedRoute: ActivatedRoute, public toastr: ToastsManager,
        public vcr: ViewContainerRef, public appService: AppService, public router: Router) {
        this.toastr.setRootViewContainerRef(vcr);
        activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/marketplace/skumasters';
        console.log(this.returnUrl);
    }
    ngOnInit() {
    }

    getElement() {
        this.resource.getById(this.id).subscribe(resource => {
            this.resourceData = resource.json().data;
            console.log(this.resourceData);
        }, (error) => {
            this.toastr.error(error.json().message);
        });
    }

    updateItem(resourceItem: any) {
        resourceItem.id = this.id;
        Helpers.setLoading(true);
        this.resource.update(resourceItem).subscribe(() => {
            Helpers.setLoading(false);
            this.appService.message = "Recurso Actualizado";
            this.router.navigate([this.returnUrl]);
        }, (error) => {
            Helpers.setLoading(false);
            this.toastr.error(error.json().message);
        })
    }
    cancel() {
        this.router.navigate([this.returnUrl]);
    }
}
