import { NgModule } from '@angular/core';
import { AutoCompleteComponent } from "./auto-complete.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [FormsModule, CommonModule
    ], exports: [
        RouterModule, AutoCompleteComponent
    ], declarations: [
        AutoCompleteComponent,
    ]
})
export class AutoCompleteModule {


}