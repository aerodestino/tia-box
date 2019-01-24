import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {DefaultComponent} from "../default.component";
import {ContactoComponent} from "./contacto.component";
import {LayoutModule} from "../../../layouts/layout.module";
import {CustomPipesModule} from "../../../../shared/pipes/custom-pipes.module";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": ContactoComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule,  NgbModule.forRoot(),
        CustomPipesModule,
    ], exports: [
        RouterModule
    ], declarations: [
        ContactoComponent,
    ]
})
export class ContactoModule {



}