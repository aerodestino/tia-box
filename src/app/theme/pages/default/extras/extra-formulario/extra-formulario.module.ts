import { NgModule } from '@angular/core';
import { ExtraFormularioComponent } from "./extra-formulario.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "../../../../layouts/layout.module";

@NgModule({
    imports: [CommonModule, LayoutModule, FormsModule,
    ], exports: [
        RouterModule, ExtraFormularioComponent
    ], declarations: [
        ExtraFormularioComponent,
    ]
})
export class ExtrasFormularioModule {


}