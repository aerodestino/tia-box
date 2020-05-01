import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ListHeaderModule } from "../../../../../shared/components/list-header/list-header.module";
import { LayoutModule } from "../../../../layouts/layout.module";
import { ActualizarExtraModule } from "../actualizar-extra/actualizar-extra.module";
import { CrearExtraModule } from "../crear-extra/crear-extra.module";
import { ExtrasDatatableComponent } from "../extras-datatable/extras-datatable.component";
import { ExtraFiltrosComponent } from "../extras-filtros/extras-filtros.component";
import { ExtrasListaComponent } from "./extras-lista.component";

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ListHeaderModule,
    NgbModule.forRoot(),
    CrearExtraModule,
    ActualizarExtraModule
  ],
  exports: [ExtrasListaComponent],
  declarations: [
    ExtrasListaComponent,
    ExtrasDatatableComponent,
    ExtraFiltrosComponent
  ]
})
export class ExtrasListaModule {}
