import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from "../../../../../app.service";
import { ProvinciasService } from "../../../../../shared/services/api/provincias.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from "@angular/router";
import {TracksService} from "../../../../../shared/services/api/tracks.service";
import {Track} from "../../../../../shared/model/track.model";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './crear-track.component.html',
    styles: []
})
export class CrearTrackComponent implements OnInit {
    returnUrl: string;
    constructor(
        public appService: AppService,
        public tracksService: TracksService,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        public activatedRoute: ActivatedRoute,
        public router: Router
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.appService.title = "CREAR";
    }
    ngOnInit() {
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    }

    crearTrack(track: Track) {
        this.tracksService.informarCompra(track).subscribe(() => {
            this.toastr.success("Track creado");
            this.router.navigate([this.returnUrl]);
        }, (error) => {
            this.toastr.error(error.json().message);
        })
    }

    cancel() {
        this.router.navigate([this.returnUrl]);
    }
}
