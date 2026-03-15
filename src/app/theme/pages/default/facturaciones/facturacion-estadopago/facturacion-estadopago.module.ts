import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FacturacionEstadoPagoComponent } from './facturacion-estadopago.component';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DefaultComponent } from '../../default.component';
import { FormsModule } from "@angular/forms";
import { ListHeaderModule } from "../../../../../shared/components/list-header/list-header.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxMyDatePickerModule } from "ngx-mydatepicker";
import {AutoCompleteModule} from "../../../../../shared/components/auto-complete/auto-complete.module";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": FacturacionEstadoPagoComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,RouterModule.forChild(routes), LayoutModule, FormsModule,AutoCompleteModule, ListHeaderModule, NgbModule.forRoot(),NgxMyDatePickerModule.forRoot(), 
    ], exports: [
        RouterModule
    ], declarations: [
        FacturacionEstadoPagoComponent
    ]
})
export class FacturacionEstadoPagoModule {

}