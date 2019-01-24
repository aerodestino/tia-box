import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseRequestOptions, HttpModule } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

import { AuthRoutingModule } from "./auth-routing.routing";
import { AuthComponent } from "./auth.component";
import { AlertComponent } from "./_directives/alert.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuard } from "./_guards/auth.guard";
import { AlertService } from "./_services/alert.service";
import { UserService } from "./_services/user.service";
import { AuthService } from "../shared/services/auth/auth.service";
import { HttpService } from "../shared/services/http/http.service";
import {environment} from "../../environments/environment";

@NgModule({
    declarations: [
        AuthComponent,
        AlertComponent,
        LogoutComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AuthRoutingModule,
    ],
    providers: [
        // API url constant
        //local
        { provide: 'API_URL', useValue: environment.API_URL},
        //prod
        //{ provide: 'API_URL', useValue: 'https://api-casillero.enkarga.com/' },
        //dev
        //{ provide: 'API_URL', useValue: 'https://api-casillero-dev.enkarga.com/app_dev.php/' },
        AuthGuard,
        AlertService,
        UserService,
        // api backend simulation
        MockBackend,
        BaseRequestOptions,
        AuthService,
        HttpService,
    ],
    entryComponents: [AlertComponent]
})

export class AuthModule {
}