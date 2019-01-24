import { EventEmitter, Input, OnInit, Output, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { Helpers } from "../../helpers";
import { AppService } from "../../app.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
export abstract class BaseDetallesComponent implements OnInit {
    public id: string | number;
    public resource: any;
    public resourceData: any;
    public returnUrl: string;
    public url: string;
    constructor(public activatedRoute: ActivatedRoute, public toastr: ToastsManager,
        public vcr: ViewContainerRef, public appService: AppService, public router: Router,
        public modalService: NgbModal) {
        this.toastr.setRootViewContainerRef(vcr);


    }
    ngOnInit() {
    }

    getElement() {
        this.resourceData = null;
        this.resource.getById(this.id).subscribe(resource => {
            this.resourceData = resource.json().data;
            console.log(this.resourceData);
        }, (error) => {
            this.toastr.error(error.json().message);
        });
    }

    onUpdate(id) {
        this.router.navigate([`${this.returnUrl}/${id}/actualizar`], { queryParams: { returnUrl: this.url } })
    }

    onDelete(content, id) {
        this.modalService.open(content).result.then((result) => {
            if (result == 'aceptar') {
                Helpers.setLoading(true);
                this.resource.delete(id).subscribe(() => {
                    this.router.navigate([this.returnUrl]);
                    Helpers.setLoading(false);
                })
            }
        });
    }
}
