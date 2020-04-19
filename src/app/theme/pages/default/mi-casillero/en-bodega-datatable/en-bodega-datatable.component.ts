import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseDatatableComponent } from "../../../../../shared/prototypes/base-datatable";
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";

@Component({
  selector: "app-en-bodega-datatable",
  templateUrl: "./en-bodega-datatable.component.html",
  styles: []
})
export class EnBodegaDatatableComponent extends BaseDatatableComponent
  implements OnInit, AfterViewInit {
  selectedAll = false;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  @Output() addFactura: EventEmitter<any> = new EventEmitter();
  @Output() ver: EventEmitter<any> = new EventEmitter();
  selectionIds: string[];

  constructor(private _script: ScriptLoaderService, public ngbModal: NgbModal) {
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
      if (item.selected) this.selectionIds.push(item.id);
    });
    this.selectionChange.emit(this.selectionIds);
  }

  onSubirFactura(event, articulo) {
    if (event.target.files && event.target.files[0]) {
      articulo.facturaExcel = event.target.files[0];
    }
  }

  subirFactura(articulo) {
    this.addFactura.emit(articulo);
  }

  onVerImagenes(articulo) {
    this.ver.emit(articulo);
  }
}
