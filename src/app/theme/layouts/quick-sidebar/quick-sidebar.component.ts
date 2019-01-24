import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../helpers';
import { EstadisticasService } from "../../../shared/services/api/estadisticas.service";
import { error } from "util";
import { AppService } from "../../../app.service";


@Component({
    selector: "app-quick-sidebar",
    templateUrl: "./quick-sidebar.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class QuickSidebarComponent implements OnInit {


    constructor(public appService: AppService) {
    }
    ngOnInit() {
    }


}