import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { AppService } from "../../../app.service";
import { NotificacionesService } from "../../../shared/services/api/notificaciones.service";
import { UsuariosService } from "../../../shared/services/api/usuarios.service";
import { ChatService } from "../../../shared/services/socket/chat.service";

declare let mLayout: any;
@Component({
  selector: "app-header-nav",
  templateUrl: "./header-nav.component.html",
  encapsulation: ViewEncapsulation.None
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
  offset = 0;
  notificaciones: any;
  noticias: any;
  loadingNotifications = false;
  defaultAvatar: any;

  constructor(
    public appService: AppService,
    public usuariosService: UsuariosService,
    public notificacionesService: NotificacionesService,
    private chatService: ChatService
  ) {
    this.defaultAvatar = "./../../../../assets/img/sin-imagen.jpg";
  }

  ngOnInit() {
    this.getProfile();
    this.getNoticias();
  }
  ngAfterViewInit() {
    mLayout.initHeader();
  }
  getProfile() {
    this.usuariosService.getProfile().subscribe(user => {
      this.appService.user = user.json().data;
      this.appService.canShowSideNav = true;
      localStorage.setItem("user_id", this.appService.user.id);
      this.chatService.initChat();
    });
  }
  getEstadisticas() {
    this.appService.getEstadisticas();
  }

  getNotificaciones() {
    this.loadingNotifications = true;
    this.notificacionesService
      .list({ limit: 10, offset: this.offset })
      .subscribe(notificaciones => {
        this.notificaciones.push(...notificaciones.json().data.results);
        this.loadingNotifications = false;
        this.appService.notificacionesSinLeer = 0;
        this.notificaciones.forEach(notificacion => {
          if (notificacion.status) this.appService.notificacionesSinLeer++;
        });
        this.offset++;
      });
  }
  getNoticias(){
    this.appService.notificacionesSinLeer = 0;
    this.appService.noticiasSinLeer = 0;
    this.notificacionesService
      .noticias()
      .subscribe(notificaciones => {
            this.appService.noticias = notificaciones.json().data;
            this.appService.noticiasSinLeer = notificaciones.json().data.length;
       
      });
  }
  onGetNotificaciones() {
    if (!this.loadingNotifications) {
      this.offset = 0;
      this.notificaciones = [];
      this.appService.notificacionesSinLeer = 0;
      this.getNotificaciones();
    }
  }
}
