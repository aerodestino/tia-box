import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DefaultComponent } from '../../default.component';
import { FormsModule } from "@angular/forms";
import { ActualizarExtraComponent } from "../actualizar-extra/actualizar-extra.component";
import { ExtrasFormularioModule } from "../extra-formulario/extra-formulario.module";

@NgModule({
    imports: [
        CommonModule, LayoutModule, FormsModule, ExtrasFormularioModule
    ], exports: [
        ActualizarExtraComponent,

    ], declarations: [
        ActualizarExtraComponent,
    ]
})
export class ActualizarExtraModule {
}