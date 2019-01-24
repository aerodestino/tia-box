import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from "./auth/logout/logout.component";

const routes: Routes = [
    { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'signup', loadChildren: './auth/registro-usuario/registro-usuario.module#RegistroUsuarioModule' },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: 'mi-casillero', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }