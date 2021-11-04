import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProvinciasService } from "../../../../shared/services/api/provincias.service";
import { BaseListComponent } from "../../../../shared/prototypes/base-list";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { AppService } from "../../../../app.service";
import {TracksService} from "../../../../shared/services/api/tracks.service";
import { Helpers } from "../../../../helpers";
@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './tutorial.component.html',
    styles: []
})
export class TutorialComponent extends BaseListComponent implements OnInit {
 
  videoselected =0;
  activo = false;
    constructor(
        public tracksService: TracksService,
        public router: Router,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        public appService: AppService
    ) {
        super(router, toastr, vcr, appService);
        this.url = '/tutorial';
        this.resourceService = tracksService;
        this.appService.title = "TUTORIAL";
    }

    ngOnInit() {
    }
    selectVideo(video) {
      if(this.videoselected != video){
        this.videoselected = video;
        this.activo = true;
      }else{
        if(this.activo)
           this.activo = false;
        else
            this.activo = true;
      }
      
    }
}
