import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ScriptLoaderService } from "../_services/script-loader.service";
import { AlertService } from "./_services/alert.service";
import { UserService } from "./_services/user.service";
import { AlertComponent } from "./_directives/alert.component";
import { LoginCustom } from "./_helpers/login-custom";
import { Helpers } from "../helpers";
import { AuthService } from "../shared/services/auth/auth.service";
import { AppService } from "../app.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageService } from "../shared/services/storage/storage.service";
import { UsuariosService } from "../shared/services/api/usuarios.service";
import { SocketService } from "../shared/services/socket/socket.service";

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: './login/login.component-2.html',
    encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup', { read: ViewContainerRef }) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass', { read: ViewContainerRef }) alertForgotPass: ViewContainerRef;

    constructor(private _router: Router,
        private _script: ScriptLoaderService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _authService: AuthService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver,
        private appService: AppService,
        public storageService: StorageService,
        public toastr: ToastsManager, public usuariosService: UsuariosService,
        vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.model.remember = true;
        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigate([this.returnUrl]);

        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
                LoginCustom.init();
            });
    }

    signin() {
        this.loading = true;
        this._authService.login(this.model.email, this.model.password)
            .subscribe(
            data => {
                let res = data.json();
                localStorage.setItem('user', this.model.email);
                localStorage.setItem('access_token', res.access_token);
                localStorage.setItem('expires_date', this.calculateTokenExpiresDateTime(res.expires_in).toString());
                this.appService.message = "Bienvenido a Enkarga";
                this._router.navigate([this.returnUrl]);
                this.getProfile();
            },
            error => {
                console.log(error.json());
                this.toastr.error("Usuario o contraseña incorrectos")
                this.loading = false;
            });
    }

    calculateTokenExpiresDateTime(expires_in) {
        let now = new Date();
        console.log(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getDay());
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        seconds = (seconds + expires_in);
        expires_in = Math.floor(seconds / 60);
        seconds %= 60;
        minutes = (minutes + expires_in);
        expires_in = Math.floor(minutes / 60);
        minutes %= 60;
        hours = (hours + expires_in);
        expires_in = Math.floor(hours / 24);
        hours %= 24;
        day = day + expires_in;
        expires_in = Math.floor(day / (this.getMonthQuantityOfDays(month, year) + 1));
        day %= (this.getMonthQuantityOfDays(month, year) + 1);
        month += expires_in;
        expires_in = month / 12;
        month %= 12;
        year += expires_in;

        let expiresDate = new Date();
        expiresDate.setFullYear(year);
        expiresDate.setMonth(month);
        expiresDate.setDate(day);
        expiresDate.setHours(hours);
        expiresDate.setMinutes(minutes);
        expiresDate.setSeconds(seconds);
        return expiresDate;
    }

    getMonthQuantityOfDays(month, year) {
        let cantFebrero = this.esBisiesto(year) ? 29 : 28;
        let quantity = [31, cantFebrero, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return quantity[month];
    }

    esBisiesto(year) {
        return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
    }

    getProfile() {
        this.usuariosService.getProfile().subscribe(user => {
            this.appService.user = user.json().data;
        });
    }

    forgotPass() {
        this.loading = true;
        this._authService.resetPassword(this.model.email).subscribe( () => {
            this.loading = false;
            this.toastr.success("Listo, le hemos enviado un correo con un link para resetear su contraseña");
        }, error => {
            this.loading = false;
            this.toastr.error(error.json().error.message);
        });
    }
}