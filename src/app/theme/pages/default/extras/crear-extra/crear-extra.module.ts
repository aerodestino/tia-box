import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DefaultComponent } from '../../default.component';
import { FormsModule } from "@angular/forms";
import { CrearExtraComponent } from "../crear-extra/crear-extra.component";
import { ExtraFormularioComponent } from "../extra-formulario/extra-formulario.component";
import { ExtrasFormularioModule } from "../extra-formulario/extra-formulario.module";

@NgModule({
    imports: [
        CommonModule, LayoutModule, FormsModule, ExtrasFormularioModule
    ], exports: [
        CrearExtraComponent,

    ], declarations: [
        CrearExtraComponent,
    ]
})
export class CrearExtraModule {



}