import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { BaseDatatableComponent } from "../../../../../shared/prototypes/base-datatable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EnviosService } from "../../../../../shared/services/api/envios.service";
import { Tracking } from "../../../../../shared/model/tracking.model";
import { Helpers } from "../../../../../helpers";
import { ToastsManager } from "ng2-toastr";
import { ArticulosService } from '../../../../../shared/services/api/articulos.service';
import { isNullOrUndefined } from "util";
import { User } from '../../../../../auth/_models';
import { UsuariosService } from '../../../../../shared/services/api/usuarios.service';
import { AppService } from '../../../../../app.service';
@Component({
    selector: 'app-embarcados-datatable',
    templateUrl: './embarcado-datatable.component.html',
    styles: []
})
export class EmbarcadoDatatableComponent extends BaseDatatableComponent implements OnInit, AfterViewInit {
    @Output() ver: EventEmitter<any> = new EventEmitter();
    @Input() url: any;
    @Output() cargar: EventEmitter<any> = new EventEmitter();
    envio: any;
    datoEmbarque=null;
    modalRef=null;
    validar:boolean= false;
    remitente_usuario = null;
    importer_usuario = null;
    unidades = 0;
    dv = false;
    articulos:any;
    totalPeso = 0;
    totalPrecio = 0;
    existeRemitente = false;
    existeImporter = false;
    consolidadoArt = false;
    confirmar: boolean = false;
    mensaje: boolean = false;
    notaembarque:string;
    descripcionembarque:string;
    text:string;
    ids:any;
    usuarios:User[];
    usuarios_importer:User[];
    constructor(private _script: ScriptLoaderService, public ngbModal: NgbModal, public enviosService: EnviosService,
        public toastr: ToastsManager,
        public articuloService: ArticulosService,
        public usuariosService:UsuariosService,
        public appService: AppService) {
        super(ngbModal);
    }

    ngOnInit() {
        this.page = this.filters.offset + 1;
        this.registroInicialPagina =
          this.totalItems > 0 ? this.filters.offset * this.filters.limit + 1 : 0;
        this.registroFinalPagina =
          this.registroInicialPagina + this.filters.limit > this.totalItems
            ? this.totalItems
            : this.registroInicialPagina + this.filters.limit - 1;
        }

    ngAfterViewInit() {
        // this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
        //     'assets/demo/default/custom/components/datatables/base/html-table.js');
    }


    descargar(file) {
        var link = document.createElement("a");
        let url = this.url+''+file;
        link.href = URL.createObjectURL(url);
        link.download = file;
        link.click();
      }

      onVerImagenes(articulo) {
        this.ver.emit(articulo);
      }

      modalEmbarque(content, articulo) {
        this.articuloService.embarcarModal({ articulos: [articulo.id] })
        .subscribe(
          (datos) => {
            Helpers.setLoading(false);
            this.datoEmbarque = datos.json().data[0][0];
            this.modalRef = this.ngbModal.open(content);
          },
          error => {
            Helpers.setLoading(false);
            this.toastr.error(error.json().error.message);
          }
        );

    }
    
    close(){
      this.modalRef.close();
    }

    
    onEmbarcar(content,id) {
      this.remitente_usuario = null;
      this.importer_usuario = null;
      
      this.existeRemitente = false;
      this.existeImporter = false;
      Helpers.setLoading(true);
      this.getUsuarios();
      this.articuloService.embarcarModal({ articulos: [id] })
        .subscribe(
          (datos) => {
            Helpers.setLoading(false);
            
            this.unidades = 0;
            this.dv = false;
            this.articulos = datos.json().data[0];
            this.totalPeso = 0;
            this.totalPrecio = 0;
            let sumPrecio = 0;
            let sumPeso = 0;
            this.consolidadoArt = false;
            this.mensaje = false;
            this.confirmar= false;
            for(let i in this.articulos){
                this.unidades = this.articulos[i].unidades ? this.articulos[i].unidades : 0;
                this.dv = this.articulos[i].fac_d_v;
                sumPrecio = sumPrecio + this.articulos[i].precio;
                sumPeso = sumPeso + this.articulos[i].peso;
                this.notaembarque = this.articulos[i].nota ? this.articulos[i].nota : '';
                this.descripcionembarque = this.articulos[i].descripcion_embarque ? this.articulos[i].descripcion_embarque : '';
                this.text = this.articulos[i].tienda_embarque ? this.articulos[i].tienda_embarque : '' ;
                if(this.articulos[i].consolidado)
                   this.consolidadoArt = true;
            }
             this.totalPrecio = sumPrecio;
             this.totalPeso = sumPeso;
            if(datos.json().data[3] != datos.json().data[1])
              this.remitente_usuario = datos.json().data[1];
            this.importer_usuario = datos.json().data[2];
            this.text = datos.json().data[3];
            this.existeRemitente = datos.json().data[4];
            this.existeImporter = datos.json().data[5];
            this.ids = datos.json().data[6];
            this.modalRef = this.ngbModal.open(content, {size: "lg"});
          },
          error => {
            Helpers.setLoading(false);
            this.toastr.error(error.json().error.message);
          }
        );
    }

    negadaConfirmacion(){
      this.mensaje = false;
      this.confirmar= false;
  }

  onSubmitEmbarcar() {
    if(this.confirmar){
      this.modalRef.close();
      Helpers.setLoading(true);
      this.articuloService
        .embarcar({articulos: this.ids,remitente:this.remitente_usuario,importer:this.importer_usuario, remitente_text:this.text,
        nota: this.notaembarque, descripcion:this.descripcionembarque,unidades:this.unidades})
        .subscribe(
          () => {
            Helpers.setLoading(false);
            this.toastr.success("Embarque actualizado");
            this.cargar.emit;
          },
          error => {
            Helpers.setLoading(false);
            this.toastr.error(error.json().error.message);
          }
        );
    }else{
      this.mensaje = true;
      this.confirmar= true;
    }
    
  }

  validarForm(){
    this.validar = false;
    if((this.existeRemitente && this.text =='' && isNullOrUndefined(this.remitente_usuario)) || 
    (this.existeImporter && isNullOrUndefined(this.importer_usuario))){
      this.validar = true;
    }
        
  }

  getUsuarios() {
    this.usuarios = null;
    this.usuarios_importer= null;
    this.usuariosService.allUsuarios({usuario_id : (this.appService.user) ? this.appService.user.id : null }).subscribe((data) => {
        this.usuarios = data.json().data.results;
        this.usuarios_importer = data.json().data.results;
    }, (error) => {
        this.toastr.error(error.json().error.message);
    });
}

}

