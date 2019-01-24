import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RegistroUsuarioComponent } from "./registro-usuario.component";
import { LayoutModule } from "../../theme/layouts/layout.module";

const routes: Routes = [
    {
        "path": "",
        "component": RegistroUsuarioComponent,
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule, NgbModule.forRoot()
    ], exports: [
        RouterModule
    ], declarations: [
        RegistroUsuarioComponent
    ]
})
export class RegistroUsuarioModule {



}