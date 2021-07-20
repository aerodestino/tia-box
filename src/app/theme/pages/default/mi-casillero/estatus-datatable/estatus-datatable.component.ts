import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "../../../../../app.service";
import { BaseDatatableComponent } from "../../../../../shared/prototypes/base-datatable";
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import { ArticulosService } from "../../../../../shared/services/api/articulos.service";
import { Helpers } from "../../../../../helpers";
import { ToastsManager } from "ng2-toastr";
import {UsuariosService} from "../../../../../shared/services/api/usuarios.service";
import {User} from "../../../../../shared/model/user.model";
import {PaisesService} from "../../../../../shared/services/api/paises.service";
import {Country} from "../../../../../shared/model/country.model";
import {Declaracion} from "../../../../../shared/model/declaracion.model";
import {Big} from 'big.js';
@Component({
  selector: "app-estatus-datatable",
  templateUrl: "./estatus-datatable.component.html",
  styles: []
})
export class EstatusDatatableComponent extends BaseDatatableComponent
  implements OnInit, AfterViewInit {
  selectedAll = false;
  text:string = '';
  costo:any[]=[] ;
  datoEmbarque=null;
  usuario: User;
  declaracion: Declaracion;
  trackbox: any;
  detalles: any;
  public usuarios: User[];
  public usuarios_importer: User[];
  public paises: Country[];
  articulodv: any;
  public totalDescripciones:number = 0;
  public pais_destino_d_v_id: any;
  public pais_origen_d_v_id: any;
  public remitente_usuario: any = null;
  public importer_usuario: any = null;
  editField: string;
  modalRef = null;
  ocultar = true;
  paqueteList: Array<any> = [];
  idlist:number;
  @Input() url: any;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  @Output() cargar: EventEmitter<any> = new EventEmitter();
  @Output() ver: EventEmitter<any> = new EventEmitter();

  selectionIds: string[];
  precios: any[];
  constructor(private _script: ScriptLoaderService, public ngbModal: NgbModal, 
    public articuloService: ArticulosService,public toastr: ToastsManager,
    public usuariosService: UsuariosService,
    public paisService: PaisesService,
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
    // this._script.load(
    //   ".m-grid__item.m-grid__item--fluid.m-wrapper",
    //   "assets/demo/default/custom/components/datatables/base/html-table.js"
    // );
  }

  changeAllState() {
    this.selectedAll = true;
    this.data.forEach(skumaster => {
      if (!skumaster.selected) this.selectedAll = false;
    });
    this.emitSelectionChange();
  }

  descargar(file) {
    var link = document.createElement("a");
    let url = this.url+''+file;
    link.href = URL.createObjectURL(url);
    link.download = file;
    link.click();
  }

  onSelectAllClick() {
    if (this.selectedAll) this.selectAll();
    else this.unselectAll();
    this.emitSelectionChange();
  }

  selectAll() {
    this.data.forEach(skumaster => {
      skumaster.selected = true;
    });
    this.emitSelectionChange();
  }

  unselectAll() {
    this.data.forEach(skumaster => {
      skumaster.selected = false;
    });
    this.emitSelectionChange();
  }

  emitSelectionChange() {
    this.selectionIds = [];
   
    this.data.forEach(item => {
      if (item.selected){
        this.selectionIds.push(item.id);
      } 
    });
    
    this.selectionChange.emit(this.selectionIds);
  
  }

  
  onVerImagenes(articulo) {
    this.ver.emit(articulo);
  }

  modalEmbarque(content, articulo) {
    Helpers.setLoading(true);
    this.datoEmbarque = articulo;
    this.modalRef = this.ngbModal.open(content);
    Helpers.setLoading(false);
}

close(){
  this.modalRef.close();
}

onVer(articulo, modal) {
  this.detalles = articulo;
  this.ngbModal.open(modal, { size: "lg" });
     
}

}
