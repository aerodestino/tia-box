import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from "./helpers";
import { AppService } from "./app.service";
import { SocketService } from "./shared/services/socket/socket.service";
import { ChatService } from "./shared/services/socket/chat.service";
import { PushNotificationsService } from "ng-push";
import { NotificacionesService } from "./shared/services/api/notificaciones.service";
import { UserService } from "./auth/_services";
import { UsuariosService } from "./shared/services/api/usuarios.service";
import {NotificationService} from "./shared/services/socket/notification.service";

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    title = 'app';
    notificaciones: any[] = [];
    globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';
    constructor(private _router: Router, public appService: AppService,
        private notificationService: NotificationService,
        private usuariosService: UsuariosService) {
        this.getProfile();
        const ios = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        console.log("ios:",ios);

        if(!ios) {
            Notification.requestPermission().then(result => {
                this.notificationService.setPermission((result == "granted"));
            });
        }
    }

    ngOnInit() {
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                Helpers.setLoading(true);
                Helpers.bodyClass(this.globalBodyClass);
            }
            if (route instanceof NavigationEnd) {
                Helpers.setLoading(false);
            }
        });
    }

    getProfile() {
        this.usuariosService.getProfile().subscribe(user => {
            this.appService.user = user.json().data;
        });
    }
}