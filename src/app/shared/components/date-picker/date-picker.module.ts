import { NgModule } from '@angular/core';
import { DatePickerComponent } from "./date-picker.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [FormsModule, CommonModule, NgbModule,
    ], exports: [
        RouterModule, DatePickerComponent
    ], declarations: [
        DatePickerComponent,
    ]
})
export class DatePickerModule {


}