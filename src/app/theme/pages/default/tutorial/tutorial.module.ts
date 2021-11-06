import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { FormsModule } from "@angular/forms";
import { ListHeaderModule } from "../../../../shared/components/list-header/list-header.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {TutorialComponent} from "./tutorial.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": TutorialComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule, ListHeaderModule, NgbModule.forRoot()
    ], exports: [
        RouterModule
    ], declarations: [
        TutorialComponent
    ]
})
export class TutorialModule {

}