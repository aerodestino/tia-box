import { NgModule } from '@angular/core';
import { ListHeaderComponent } from "./list-header.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [FormsModule, CommonModule
    ], exports: [
        RouterModule, ListHeaderComponent
    ], declarations: [
        ListHeaderComponent,
    ]
})
export class ListHeaderModule {


}