import { NgModule } from '@angular/core';
import { ProductSelectorComponent } from "./product-selector.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CustomPipesModule } from "../../pipes/custom-pipes.module";

@NgModule({
    imports: [FormsModule, CommonModule, CustomPipesModule
    ], exports: [
        RouterModule, ProductSelectorComponent
    ], declarations: [
        ProductSelectorComponent,

    ]
})
export class ProductSelectorModule {


}