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
import { MiCasilleroListaComponent } from "./mi-casillero-lista.component";
import { EnBodegaDatatableComponent } from "../en-bodega-datatable/en-bodega-datatable.component";
import { EstatusDatatableComponent } from "../estatus-datatable/estatus-datatable.component";
import { EnBodegaListHeaderComponent } from "../en-bodega-list-header/en-bodega-list-header.component";
import { EstatusListHeaderComponent } from "../estatus-list-header/estatus-list-header.component";
import { EnTransitoDatatableComponent } from "../en-transito-datatable/en-transito-datatable.component";
import { EmbarcadoDatatableComponent } from "../embarcado-datatable/embarcado-datatable.component";
import { FacturacionDatatableComponent } from "../facturacion-datatable/facturacion-datatable.component";
import { RutaNacionalDatatableComponent } from "../ruta-nacional-datatable/ruta-nacional-datatable.component";
import { EntregadosDatatableComponent } from "../entregados-datatable/entregados-datatable.component";
import { ReplacePipe } from '../../../../../shared/pipes/replace.pipes';
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": MiCasilleroListaComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule, ListHeaderModule, NgbModule.forRoot(), AutoCompleteModule,
        CustomPipesModule,
    ], exports: [
        RouterModule
    ], declarations: [
        MiCasilleroListaComponent,
        EnBodegaDatatableComponent,
        EnBodegaListHeaderComponent,
        EnTransitoDatatableComponent,
        FacturacionDatatableComponent,
        RutaNacionalDatatableComponent,
        EntregadosDatatableComponent,
        EmbarcadoDatatableComponent,
        EstatusDatatableComponent,
        EstatusListHeaderComponent,
        ReplacePipe
    ]
})
export class MiCasilleroListaModule {



}