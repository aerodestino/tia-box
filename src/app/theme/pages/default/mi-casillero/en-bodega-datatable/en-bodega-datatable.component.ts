import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseDatatableComponent } from "../../../../../shared/prototypes/base-datatable";
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import { ArticulosService } from "../../../../../shared/services/api/articulos.service";
import { Helpers } from "../../../../../helpers";
import { ToastsManager } from "ng2-toastr";

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
  modalRef=null;
  @Input() url: any;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  @Output() cargar: EventEmitter<any> = new EventEmitter();
  @Output() addFactura: EventEmitter<any> = new EventEmitter();
  @Output() ver: EventEmitter<any> = new EventEmitter();
  @Output() trackboxOutput: EventEmitter<any> = new EventEmitter();
  @Output() datosSelection: EventEmitter<any> = new EventEmitter();
  @Output() facturaSelection: EventEmitter<any> = new EventEmitter();
  @Output() preciosSelection: EventEmitter<any> = new EventEmitter();
  @Output() consolidarSelection: EventEmitter<any> = new EventEmitter();
  @Output() enviarSelection: EventEmitter<any> = new EventEmitter();
  selectionIds: string[];
  precios: any[];
  constructor(private _script: ScriptLoaderService, public ngbModal: NgbModal, 
    public articuloService: ArticulosService,public toastr: ToastsManager,) {
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
    this.data.forEach(item => {
      if (item.selected){
        this.selectionIds.push(item.id);
        if(!this.text  || (this.text && this.text == '')) this.text = item.trackbox;
        this.costo.push(item.precio);
        if(item.factura_file)
          existeFactura ++;
        if(item.consolidado)
          existeConsolidado ++;
        if(item.enviar)
          existeEmbarcado ++;
        if(!item.editarprecio)
          existePrecio ++;
      } 
    });
    this.trackboxOutput.emit(this.text);
    this.selectionChange.emit(this.selectionIds);
    this.datosSelection.emit(this.costo);
    (existeFactura > 0) ? this.facturaSelection.emit(false) : this.facturaSelection.emit(true);
    (existeFactura == this.selectionIds.length && existeConsolidado == 0) ? this.consolidarSelection.emit(false) : this.consolidarSelection.emit(true);
    (existeFactura == this.selectionIds.length && existeEmbarcado == 0) ? this.enviarSelection.emit(false) : this.enviarSelection.emit(true);
    (existePrecio > 0) ? this.preciosSelection.emit(true) : this.preciosSelection.emit(false);
  }

  onSubirFactura(event, articulo) {
    if (event.target.files && event.target.files[0]) {
      articulo.facturaExcel = event.target.files[0];
    }
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

}
