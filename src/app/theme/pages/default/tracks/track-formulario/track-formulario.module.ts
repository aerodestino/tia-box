import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "../../../../layouts/layout.module";
import {CKEditorModule} from "ng2-ckeditor";
import {TrackFormularioComponent} from "./track-formulario.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [CommonModule, LayoutModule, FormsModule, CKEditorModule, NgbModule.forRoot()
    ], exports: [
        RouterModule, TrackFormularioComponent
    ], declarations: [
        TrackFormularioComponent,
    ]
})
export class TrackFormularioModule {


}