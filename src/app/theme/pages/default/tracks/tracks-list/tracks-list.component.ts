import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProvinciasService } from "../../../../../shared/services/api/provincias.service";
import { BaseListComponent } from "../../../../../shared/prototypes/base-list";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { AppService } from "../../../../../app.service";
import {TracksService} from "../../../../../shared/services/api/tracks.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './tracks-list.component.html',
    styles: []
})
export class TracksListComponent extends BaseListComponent implements OnInit {

    constructor(
        public tracksService: TracksService,
        public router: Router,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        public appService: AppService
    ) {
        super(router, toastr, vcr, appService);
        this.url = '/tracks';
        this.resourceService = tracksService;
        this.appService.title = "Lista";
        this.filters.status = 1;
        this.filters.usuario_id = localStorage.getItem('user_id');
    }

    ngOnInit() {
        super.getData();
    }

}
