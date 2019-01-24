import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { AppService } from "../../../app.service";
import { UsuariosService } from "../../../shared/services/api/usuarios.service";
import { SocketService } from "../../../shared/services/socket/socket.service";
import {NotificacionesService} from "../../../shared/services/api/notificaciones.service";
import {ChatService} from "../../../shared/services/socket/chat.service";

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    offset = 0;
    notificaciones: any;
    loadingNotifications = false;
    constructor(public appService: AppService, public usuariosService: UsuariosService, public notificacionesService: NotificacionesService,
                private chatService: ChatService) {

    }
    ngOnInit() {
        this.getProfile();
    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }
    getProfile() {
        this.usuariosService.getProfile().subscribe(user => {

            this.appService.user = user.json().data;
            this.appService.canShowSideNav = true;
            localStorage.setItem('user_id', this.appService.user.id);
            console.log("user", this.appService.user);
            this.chatService.initChat();
        });
    }
    getEstadisticas() {
        this.appService.getEstadisticas();
    }

    getNotificaciones() {
        this.loadingNotifications = true;
        this.notificacionesService.list({limit: 10, offset: this.offset}).subscribe(notificaciones => {
            console.log(this.notificaciones, notificaciones.json().data.results);
            this.notificaciones.push(...notificaciones.json().data.results);
            this.loadingNotifications = false;
            this.appService.notificacionesSinLeer = 0;
            this.notificaciones.forEach( notificacion => {
               if(notificacion.status) this.appService.notificacionesSinLeer++;
            });
            this.offset++;
            console.log(this.notificaciones);
        });
    }
    onGetNotificaciones() {
        if(!this.loadingNotifications){
            this.offset = 0;
            this.appService.notificacionesSinLeer = 0;
            this.notificaciones = [];
            this.getNotificaciones();
        }



    }
}

