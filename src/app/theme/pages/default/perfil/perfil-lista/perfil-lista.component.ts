import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewEncapsulation,
  EventEmitter,
  Output
} from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastsManager } from "ng2-toastr";
import { AppService } from "../../../../../app.service";
import { Helpers } from "../../../../../helpers";
import { BaseListComponent } from "../../../../../shared/prototypes/base-list";
import { UsuariosService } from "../../../../../shared/services/api/usuarios.service";

@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./perfil-lista.component.html",
  encapsulation: ViewEncapsulation.None,
  styles: []
})
export class PerfilListaComponent extends BaseListComponent implements OnInit {
  defaultAvatar: any;
  usuario: any;
  extra: any;
  documento = null;
  imagenNueva = null;
  imagenVieja = null;
  inputFile = null;

  constructor(
    public router: Router,
    public ngbModal: NgbModal,
    public toastr: ToastsManager,
    public usuariosService: UsuariosService,
    public vcr: ViewContainerRef,
    public appService: AppService
  ) {
    super(router, toastr, vcr, appService);
    this.url = "/mi-perfil";
    this.appService.title = "Perfil de Usuario";
    this.defaultAvatar = "./../../../../../../assets/img/sin-imagen.jpg";
  }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    this.usuariosService.getProfile().subscribe(
      usuario => {
        this.appService.user = usuario.json().data;
        this.usuario = usuario.json().data;
      },
      error => {
        this.toastr.error(error.json().error.message);
      }
    );
  }

  onPreviewImage(event) {
    if (event.target.files && event.target.files[0]) {
      this.imagenNueva = event.target.files[0];
      let reader = new FileReader();

      reader.onload = (event1: any) => {
        this.imagenVieja = this.usuario.avatar && this.usuario.avatar.web_url ? this.usuario.avatar.web_url : this.defaultAvatar;
        this.usuario.avatar.web_url = event1.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onCancelarCambioImagen() {
    this.usuario.avatar.web_url = this.imagenVieja;
    this.imagenNueva = this.imagenVieja = null;
    this.inputFile = null;
  }

  onCambiarImagen() {
    const formData: FormData = new FormData();
    formData.append("avatar", this.imagenNueva, this.imagenNueva.name);
    Helpers.setLoading(true);
    this.usuariosService.cambiarImagen(formData).subscribe(
      res => {
        this.toastr.success("Imagen Cambiada");
        this.imagenNueva = this.imagenVieja = null;
        Helpers.setLoading(false);
      },
      error => {
        Helpers.setLoading(false);
        this.toastr.error(error.json().error.message);
      }
    );
  }

  onSubirDocumento(event) {
    if (event.target.files && event.target.files[0]) {
      this.documento = event.target.files[0];

      const formData: FormData = new FormData();
      formData.append("identidad", this.documento, this.documento.name);
      Helpers.setLoading(true);
      this.usuariosService.subirDocumento(formData).subscribe(
        res => {
          Helpers.setLoading(false);
          this.toastr.success("Documento Guardado");
        },
        error => {
          Helpers.setLoading(false);
          this.toastr.error(error.json().error.message);
        }
      );
    }
  }

  verCupos(usuario, modal) {
    this.extra = usuario;
    this.ngbModal.open(modal);
  }

  cambiarPass(message) {
    console.log(message);
    this.toastr.error(message);
  }
  
}
