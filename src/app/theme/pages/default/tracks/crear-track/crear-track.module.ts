import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DefaultComponent } from '../../default.component';
import { FormsModule } from "@angular/forms";
import {CrearTrackComponent} from "./crear-track.component";
import {TrackFormularioModule} from "../track-formulario/track-formulario.module";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": CrearTrackComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, FormsModule, TrackFormularioModule
    ], exports: [
        RouterModule,

    ], declarations: [
        CrearTrackComponent,
    ]
})
export class CrearTrackModule {



}