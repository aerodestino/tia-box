import { NgModule } from '@angular/core';
import { ImageSelectorComponent } from "./image-selector.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [FormsModule, CommonModule
    ], exports: [
        RouterModule, ImageSelectorComponent
    ], declarations: [
        ImageSelectorComponent,
    ]
})
export class ImageSelectorModule {


}