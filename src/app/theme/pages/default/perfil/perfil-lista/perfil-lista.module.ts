import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DefaultComponent } from '../../default.component';
import { FormsModule } from "@angular/forms";
import { ListHeaderModule } from "../../../../../shared/components/list-header/list-header.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AutoCompleteModule } from "../../../../../shared/components/auto-complete/auto-complete.module";
import { CustomPipesModule } from "../../../../../shared/pipes/custom-pipes.module";
import { PerfilListaComponent } from "./perfil-lista.component";
import { CuentaComponent } from "../cuenta/cuenta.component";
import { PasswordComponent } from "../password/password.component";
import {ExtrasListaComponent} from "../../extras/extras-lista/extras-lista.component";
import {ExtrasListaModule} from "../../extras/extras-lista/extras-lista.module";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": PerfilListaComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule, ListHeaderModule, NgbModule.forRoot(), AutoCompleteModule, ExtrasListaModule,
        CustomPipesModule,
    ], exports: [
        RouterModule
    ], declarations: [
        PerfilListaComponent, CuentaComponent, PasswordComponent
    ]
})
export class PerfilListaModule {


}