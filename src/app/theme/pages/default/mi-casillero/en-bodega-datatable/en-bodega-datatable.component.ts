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
  selector: "app-en-bodega-datatable",
  templateUrl: "./en-bodega-datatable.component.html",
  styles: []
})
export class EnBodegaDatatableComponent extends BaseDatatableComponent
  implements OnInit, AfterViewInit {
  selectedAll = false;
  text:string = '';
  costo:any[]=[] ;
  datoEmbarque=null;
  usuario: User;
  declaracion: Declaracion;
  trackbox: any;
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
  @Output() addFactura: EventEmitter<any> = new EventEmitter();
  @Output() ver: EventEmitter<any> = new EventEmitter();
  @Output() trackboxOutput: EventEmitter<any> = new EventEmitter();
  @Output() datosSelection: EventEmitter<any> = new EventEmitter();
  @Output() dvSelection: EventEmitter<any> = new EventEmitter();
  @Output() facturaSelection: EventEmitter<any> = new EventEmitter();
  @Output() preciosSelection: EventEmitter<any> = new EventEmitter();
  @Output() consolidarSelection: EventEmitter<any> = new EventEmitter();
  @Output() enviarSelection: EventEmitter<any> = new EventEmitter();
  @Output() retirarSelection: EventEmitter<any> = new EventEmitter();
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
    this.costo = [];
    let existeFactura = 0;
    let existeConsolidado = 0;
    let existeEmbarcado = 0;
    let existePrecio = 0;
    let existeRetirar = 0;
    this.data.forEach(item => {
      if (item.selected){
        this.selectionIds.push(item.id);
        if(!this.text  || (this.text && this.text == '')) this.text = item.trackbox;
        const datos =  {  costo:item.precio,
          consignatario: (item.extra_importer_d_v) ? item.extra_importer_d_v.identificacion : ((item.usuario_importer_d_v) ? item.usuario_importer_d_v.numero_identidad : ((item.usuario) ? item.usuario.numero_identidad : ((item.extra) ? item.extra.identificacion : ((item.extra_carrier) ? item.extra_carrier.identificacion : (item.usuario_carrier) ? item.usuario_carrier.numero_identidad : null)))) , 
          remitente: (item.extra_carrier_d_v) ? item.extra_carrier_d_v.identificacion : ((item.usuario_carrier_d_v) ? item.usuario_carrier_d_v.numero_identidad : null),
         remitente_text : item.tienda_d_v ? item.tienda : ''};
        this.costo.push(datos);
        if(item.factura_url)
          existeFactura ++;
        if(item.editar_consolidacion || item.retiro)
          existeConsolidado ++;
        if(item.editar_embarque || item.retiro)
          existeEmbarcado ++;
        if(!item.editarprecio)
          existePrecio ++;
        if(!item.consolidado && !item.enviar && !item.facturacion)
          existeRetirar ++ ;
      } 
    });
    this.trackboxOutput.emit(this.text);
    this.selectionChange.emit(this.selectionIds);
    this.datosSelection.emit(this.costo);
    (existeConsolidado == 0) ? this.facturaSelection.emit(false) : this.facturaSelection.emit(true);
    (existeConsolidado == 0) ? this.dvSelection.emit(false) : this.dvSelection.emit(true);
    (existeFactura == this.selectionIds.length && existeConsolidado == 0) ? this.consolidarSelection.emit(false) : this.consolidarSelection.emit(true);
    (existeFactura == this.selectionIds.length && existeEmbarcado == 0) ? this.enviarSelection.emit(false) : this.enviarSelection.emit(true);
    (existePrecio > 0) ? this.preciosSelection.emit(true) : this.preciosSelection.emit(false);
    (existeRetirar == this.selectionIds.length) ? this.retirarSelection.emit(false) : this.retirarSelection.emit(true);

  }

  onSubirFactura(event, articulo) {
    if (event.target.files && event.target.files[0]) {
      articulo.facturaExcel = event.target.files[0];
    }
    articulo.tipo = false;
  }

  guardarPrecio(id,precio) {
      if(precio > 0){
        Helpers.setLoading(true);
        this.articuloService.guardarPrecio(id, {precio:precio }).subscribe(resource => {
            this.toastr.success('Artículo editado correctamente.');
            Helpers.setLoading(false);
            this.cargar.emit();
        }, error => {
          if(error.json().error && error.json().error.message)
              this.toastr.error(error.json().error.message);
          else
            this.toastr.error('Ocurrió un error al editar el costo');
            Helpers.setLoading(false);
        });
      }else{
        this.toastr.error('El valor debe ser mayor que cero');
      } 
}

  subirFactura(articulo) {
    this.addFactura.emit(articulo);
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

declaracionValores(content,id,articulo) {
  Helpers.setLoading(true);
  let person = [];
  this.totalDescripciones = 0;
  this.importer_usuario=null;
  this.remitente_usuario =null;
  this.paqueteList=[];
  this.getUsuarios();
  this.getPaises();  
  this.declaracion = new Declaracion;
  this.trackbox= articulo.trackbox;
  this.articulodv= articulo;
  let fecha = new Date(this.articulodv.fecha_bodega);
  if(this.articulodv.fecha_expiracion_d_v)
      fecha = new Date(this.articulodv.fecha_expiracion_d_v);
  
  this.articulodv.fecha_expiracion_d_v = {
      "year": fecha.getFullYear(),
      "month": fecha.getMonth() + 1,
      "day": fecha.getDate()
  }; 
  if(this.articulodv.descripciones_d_v){
      for(let i in this.articulodv.descripciones_d_v ){
          person.push({ id: articulo.id , descripcion: this.articulodv.descripciones_d_v[i]['descripcion'], cantidad: this.articulodv.descripciones_d_v[i]['cantidad'] , 
          vunitario: this.articulodv.descripciones_d_v[i]['vunitario'], total: this.articulodv.descripciones_d_v[i]['cantidad'] * this.articulodv.descripciones_d_v[i]['vunitario'] });
          this.totalDescripciones = this.totalDescripciones + (this.articulodv.descripciones_d_v[i]['cantidad'] * this.articulodv.descripciones_d_v[i]['vunitario']);
      }
      this.paqueteList.push(person);
  }else{
      const person =  [{ id: articulo.id , descripcion: 'N/A', cantidad: 0 , vunitario: 0, total: 0 }];
      this.paqueteList.push(person);
  }

  if(!this.articulodv.pais_origen_d_v)
      this.pais_origen_d_v_id = 9;
  else    
      this.pais_origen_d_v_id = this.articulodv.pais_origen_d_v.id;
  if(!this.articulodv.pais_destino_d_v)
      this.pais_destino_d_v_id = 8;
  else
      this.pais_destino_d_v_id = this.articulodv.pais_destino_d_v.id;
      if(this.articulodv.usuario_carrier_d_v || this.articulodv.extra_carrier_d_v)
      this.remitente_usuario = (this.articulodv.extra_carrier_d_v) ? this.articulodv.extra_carrier_d_v.identificacion : (this.articulodv.usuario_carrier_d_v) ? this.articulodv.usuario_carrier_d_v.numero_identidad : null;
  if(this.articulodv.usuario_importer_d_v || this.articulodv.extra_importer_d_v)
      this.importer_usuario = (this.articulodv.extra_importer_d_v) ? this.articulodv.extra_importer_d_v.identificacion : (this.articulodv.usuario_importer_d_v) ? this.articulodv.usuario_importer_d_v.numero_identidad : null;
  if(!this.remitente_usuario)
      this.remitente_usuario = (this.articulodv.extra_carrier) ? this.articulodv.extra_carrier.identificacion : (this.articulodv.usuario_carrier) ? this.articulodv.usuario_carrier.numero_identidad : null;
  if(!this.importer_usuario)
      this.importer_usuario = (this.articulodv.usuario) ? this.articulodv.usuario.numero_identidad : (this.articulodv.extra) ? this.articulodv.extra.identificacion : null;
  if(!this.articulodv.tienda_d_v || this.articulodv.tienda_d_v == '')
      this.articulodv.tienda_d_v = this.articulodv.tienda;
  this.declaracion.articulo_id = id;
  this.modalRef = this.ngbModal.open(content, {size: "lg"});
  Helpers.setLoading(false);
}

cambiomasiva(){
}

onSubmit(value) {
  let existe = false;
  if(this.paqueteList[0].length > 0){
    for(let i in this.paqueteList[0]){
      if(this.paqueteList[0][i].descripcion =='N/A' || this.paqueteList[0][i].descripcion =='' || this.paqueteList[0][i].cantidad==''|| this.paqueteList[0][i].vunitario==''|| this.paqueteList[0][i].cantidad==0 || this.paqueteList[0][i].vunitario==0 || this.paqueteList[0][i].total==0){
        existe = true;
        break;
      }
    }
  }else{
    existe = true;
  }
  if(!existe){
      Helpers.setLoading(true);
      this.modalRef.close();
      this.declaracion.awb= this.articulodv.trackbox;
      this.articuloService.declaracionValores(this.declaracion.articulo_id, value).subscribe( (pdf) => {
        //  this.excelWorkService.downloadXLS(this.trackbox +'.pdf', pdf);
          
          Helpers.setLoading(false);
          this.toastr.success("Declaración de valores creada");
          this.cargar.emit();
      }, error => {
          Helpers.setLoading(false);
         this.toastr.error(error.json().error.message);
      });
  }else{
      Helpers.setLoading(false);
         this.toastr.error('Debe llenar correctamente las descripciones'); 
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

getPaises() {
this.paises = null;
this.paisService.getAll().subscribe((data) => {
    this.paises = data.json().data;
}, (error) => {
    this.toastr.error(error.json().error.message);
});
}


updateList(id: number, property: string, event: any) {
console.log(event.target.textContent);
this.paqueteList[0][id][property] = event.target.textContent;
console.log(this.paqueteList[0][id][property]);

if(this.paqueteList[0][id]['cantidad'] && this.paqueteList[0][id]['vunitario']){
  let c = Big(this.paqueteList[0][id]['cantidad']);
  let v = Big(this.paqueteList[0][id]['vunitario']);
  this.paqueteList[0][id]['total'] = c.mul(v);
  let t = Big(this.paqueteList[0][id]['total']);
  let td = Big(this.totalDescripciones);
  this.totalDescripciones = t.plus(td);
  let d = Big(this.totalDescripciones);
  this.totalDescripciones = d.toNumber();
} console.log(this.paqueteList);
}

remove(id: any) {
let t = Big(this.totalDescripciones);
this.totalDescripciones = t.sub(this.paqueteList[0][id]['total'])
this.paqueteList[0].splice(id, 1);
}

add() {
  this.idlist= this.paqueteList[0].length;
  const person =  { id: this.idlist ,  descripcion: 'N/A',  cantidad:0, vunitario: 0, total: 0 };
  this.paqueteList[0].push(person);

}

changeValue(id: number, property: string, event: any) {
  this.editField = event.target.textContent;
}

onSubirFacturaMasiva(event, articulo) {
if (event.target.files && event.target.files[0]) {
    articulo.facturaExcel = event.target.files[0];
}
articulo.tipo = true;

}

}
