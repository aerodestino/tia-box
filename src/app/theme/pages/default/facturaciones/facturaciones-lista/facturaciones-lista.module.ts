import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FacturacionesListaComponent } from './facturaciones-lista.component';
import { FacturacionesDatatableComponent } from '../facturaciones-datatable/facturaciones-datatable.component';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DefaultComponent } from '../../default.component';
import { FormsModule } from "@angular/forms";
import { ListHeaderModule } from "../../../../../shared/components/list-header/list-header.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {PerfilListaComponent} from "../../perfil/perfil-lista/perfil-lista.component";
import {MomentTimezoneModule} from 'angular-moment-timezone';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": FacturacionesListaComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,MomentTimezoneModule, RouterModule.forChild(routes), LayoutModule, FormsModule, ListHeaderModule, NgbModule.forRoot(),
    ], exports: [
        FacturacionesListaComponent
    ], declarations: [
        FacturacionesListaComponent,
        FacturacionesDatatableComponent,
        ]
})
export class FacturacionesListaModule {

}