import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExtrasListaComponent } from './extras-lista.component';
import { ExtrasDatatableComponent } from '../extras-datatable/extras-datatable.component';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DefaultComponent } from '../../default.component';
import { FormsModule } from "@angular/forms";
import { ListHeaderModule } from "../../../../../shared/components/list-header/list-header.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {ExtraFiltrosComponent} from "../extras-filtros/extras-filtros.component";
import {CrearExtraModule} from "../crear-extra/crear-extra.module";
import {ActualizarExtraModule} from "../actualizar-extra/actualizar-extra.module";

@NgModule({
    imports: [
        CommonModule, LayoutModule, FormsModule, ListHeaderModule, NgbModule.forRoot(), CrearExtraModule, ActualizarExtraModule
    ], exports: [
        ExtrasListaComponent
    ], declarations: [
        ExtrasListaComponent,
        ExtrasDatatableComponent,
        ExtraFiltrosComponent,
    ]
})
export class ExtrasListaModule {

}