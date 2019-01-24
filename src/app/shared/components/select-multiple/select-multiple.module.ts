import { NgModule } from '@angular/core';
import { SelectMultipleComponent } from "./select-multiple.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [FormsModule, CommonModule
    ], exports: [
        RouterModule, SelectMultipleComponent
    ], declarations: [
        SelectMultipleComponent,
    ]
})
export class SelectMultipleModule {


}