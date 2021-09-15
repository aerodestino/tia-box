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
import { ArancelesService } from '../../../../../shared/services/api/aranceles.service';
import { Arancel } from '../../../../../shared/model/arancel.model';
import {Big} from 'big.js';
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
    confirmar: boolean = false;
    mensaje: boolean = false;
    notaembarque:string;
    descripcionembarque:string;
    text:string;
    ids:any;
    usuarios:User[];
    usuarios_importer:User[];
    consolidadoFact = false;
    consolidadoArt = false;
    aranceles: Arancel[];
    arancelesCat: Arancel[];
    arancel: any = 'B';
    constructor(private _script: ScriptLoaderService, public ngbModal: NgbModal, public enviosService: EnviosService,
        public toastr: ToastsManager,
        public articuloService: ArticulosService,
        public usuariosService:UsuariosService,
        public appService: AppService,
        public arancelesService : ArancelesService) {
        super(ngbModal);
    }

    ngOnInit() {
      this.getArancelesCat();
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
      let existe=false;
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
            this.consolidadoFact = false;
            this.articulos = datos.json().data[0];
            this.totalPeso = 0;
            this.totalPrecio = 0;
            let sumPrecio = 0;
            let sumPeso = 0;
            this.consolidadoArt = false;
            this.mensaje = false;
            this.confirmar= false;
            let desc = [];
            for(let i in this.articulos){
                this.arancel = this.articulos[i].categoria ? this.articulos[i].categoria : 'B';
                this.unidades = this.articulos[i].unidades ? this.articulos[i].unidades : 0;
                if(!this.dv)
                  this.dv = this.articulos[i].fac_d_v;
                if(!this.consolidadoFact)
                  this.consolidadoFact = !this.articulos[i].consolidado_factura && this.articulos[i].consolidado;
                this.articulos[i].consolidadoFact = !this.articulos[i].consolidado_factura && this.articulos[i].consolidado;
                let precio = Big(this.articulos[i].precio);
                sumPrecio = precio.plus(sumPrecio);
                let peso = Big(this.articulos[i].peso);
                sumPeso = peso.plus(sumPeso);
                let p= Big(sumPeso);
                sumPeso = p.toNumber();
                this.notaembarque = this.articulos[i].nota ? this.articulos[i].nota : '';
                this.descripcionembarque = this.articulos[i].descripcion_embarque ? this.articulos[i].descripcion_embarque : '';
                if(this.descripcionembarque == ''){
                  this.articulos[i].descripcion_embarque = this.articulos[i].descripcion;
                  let c=1;
                  if(desc.length == 0){
                    desc[0]=this.articulos[i].descripcion;
                  }else{
                    for(let e in desc){
                        if(desc[e] != this.articulos[i].descripcion)
                          desc[c]=this.articulos[i].descripcion;
                          c++;
                    }
                  }
                }
                this.descripcionembarque = desc.join(',');
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
      Helpers.setLoading(true);
      let unidadesCons:any[] = [];
      let descCons:any[] = [];
      let existe = false;
      if(this.consolidadoFact){
        for(let i in this.articulos){
          if(!this.articulos[i].unidades || this.articulos[i].unidades <= 0)
            existe = true;
          else{
            unidadesCons[i] = {
              id : this.articulos[i].id,
              unidades: this.articulos[i].unidades
            };
          }
          descCons[i] = {
            id : this.articulos[i].id,
            descripciones: this.articulos[i].descripcion_embarque
          };
        }
      }
      if(!existe){
        this.modalRef.close();
        this.articuloService
        .embarcar({articulos: this.ids,remitente:this.remitente_usuario,importer:this.importer_usuario, remitente_text:this.text,
        nota: this.notaembarque, descripcion:this.descripcionembarque,unidades:this.unidades,unidadesMasivas:unidadesCons,categoria:this.arancel,descMasiva : descCons})
        .subscribe(
          () => {
            Helpers.setLoading(false);
            this.toastr.success("Embarque Actualizado");
            this.cargar.emit();
          },
          error => {
            Helpers.setLoading(false);
            this.toastr.error(error.json().error.message);
          }
        );
      }else{
        this.toastr.error('Debe asignar unidades físicas a todos los artículos.');
        Helpers.setLoading(false);
      }
     
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

getArancelesCat() {
  this.arancelesService.categoria().subscribe(aranceles => {
      this.arancelesCat = aranceles.json().data;
  });
}
}

