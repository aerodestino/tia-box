import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "children": [
            {
                "path": "mi-casillero",
                "loadChildren": ".\/pages\/default\/mi-casillero\/mi-casillero-lista\/mi-casillero-lista.module#MiCasilleroListaModule",
                "canActivate": [AuthGuard],
            },
            {
                "path": "",
                "redirectTo": "mi-casillero",
                "pathMatch": "full"
            },
            {
                "path": "perfil",
                "loadChildren": ".\/pages\/default\/perfil\/perfil-lista\/perfil-lista.module#PerfilListaModule",
                "canActivate": [AuthGuard],
            },
            {
                "path": "notificaciones/:id",
                "loadChildren": ".\/pages\/default\/notificacion\/notificacion.module#NotificacionModule",
                "canActivate": [AuthGuard],
            },
            {
                "path": "contacto",
                "loadChildren": ".\/pages\/default\/contacto\/contacto.module#ContactoModule",
                "canActivate": [AuthGuard],
            },

            {
                "path": "tracks",
                "loadChildren": ".\/pages\/default\/tracks\/tracks-list\/tracks-list.module#TracksListModule",
                "canActivate": [AuthGuard],
            },
            {
                "path": "tracks/crear",
                "loadChildren": ".\/pages\/default\/tracks\/crear-track\/crear-track.module#CrearTrackModule",
                "canActivate": [AuthGuard],
            },
            {
                "path": "faqs",
                "loadChildren": ".\/pages\/default\/preguntas\/preguntas.module#PreguntasModule",
                "canActivate": [AuthGuard],
            },
            {
                "path": "calculadora",
                "loadChildren": ".\/pages\/default\/calculadora\/calculadora.module#CalculadoraModule",
                "canActivate": [AuthGuard],
            },
            {
                "path": "facturas",
                "loadChildren": ".\/pages\/default\/facturaciones\/facturaciones-lista/facturaciones-lista.module#FacturacionesListaModule",
                "canActivate": [AuthGuard],
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }