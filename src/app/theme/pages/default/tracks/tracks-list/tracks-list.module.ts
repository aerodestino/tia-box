import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DefaultComponent } from '../../default.component';
import { FormsModule } from "@angular/forms";
import { ListHeaderModule } from "../../../../../shared/components/list-header/list-header.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {TracksListComponent} from "./tracks-list.component";
import {TracksDatatableComponent} from "../tracks-datatable/tracks-datatable.component";
import {MomentTimezoneModule} from 'angular-moment-timezone';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": TracksListComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, MomentTimezoneModule,RouterModule.forChild(routes), LayoutModule, FormsModule, ListHeaderModule, NgbModule.forRoot()
    ], exports: [
        RouterModule
    ], declarations: [
        TracksListComponent,
        TracksDatatableComponent,
    ]
})
export class TracksListModule {

}