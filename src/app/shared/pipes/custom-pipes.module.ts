import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TextDropPipe } from "./text-drop.pipe";

@NgModule({
    imports: [FormsModule, CommonModule
    ], exports: [
        TextDropPipe,
    ], declarations: [
        TextDropPipe
    ]
})
export class CustomPipesModule {


}