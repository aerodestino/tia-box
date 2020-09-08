import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewEncapsulation
} from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastsManager } from "ng2-toastr";
import { AppService } from "../../../../../app.service";
import { Helpers } from "../../../../../helpers";
import { BaseListComponent } from "../../../../../shared/prototypes/base-list";
import { ArticulosService } from "../../../../../shared/services/api/articulos.service";
import { UsuariosService } from "../../../../../shared/services/api/usuarios.service";

@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./mi-casillero-lista.component.html",
  encapsulation: ViewEncapsulation.None,
  styles: []
})
export class MiCasilleroListaComponent extends BaseListComponent
  implements OnInit {
  usuario: any;
  enBodega: any[];
  enTransito: any[];
  facturacion: any[];
  rutaNacional: any[];
  entregados: any[];
  articulo: any;

  enBodegaSeleccionadas = true;
  enTransitoSeleccionadas = false;
  facturacionSeleccionadas = false;
  rutaNacionalSeleccionadas = false;
  entregadosSeleccionadas = false;

  enBodegaSeleccion: any[];

  totalEnBodega = 0;
  totalEnTransito = 0;
  totalFacturacion = 0;
  totalRutaNacional = 0;
  totalEntregados = 0;

  enBodegaFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 2
  };

  enTransitoFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 3
  };

  facturacionFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 4
  };

  rutaNacionalFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 5
  };

  entregadosFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 6
  };
  constructor(
    public router: Router,
    public articulosService: ArticulosService,
    public toastr: ToastsManager,
    public usuariosService: UsuariosService,
    public ngbModal: NgbModal,
    public vcr: ViewContainerRef,
    public appService: AppService
  ) {
    super(router, toastr, vcr, appService);
    this.url = "/mi-casillero";
    this.appService.title = "MI CASILLERO";
  }

  ngOnInit() {
    // this.getUsuario();
    this.getEnBodega();
    this.getEnTransito();
    this.getFacturacion();
    this.getRutaNacional();
    this.getEntregados();
  }

  getUsuario() {
    this.usuariosService.getProfile().subscribe(
      usuario => {
        this.usuario = usuario.json().data;
        this.getEnBodega();
      },
      error => {
        this.toastr.error(error.json().error.message);
      }
    );
  }

  onEnBodegaSelectionChange(selection) {
    this.enBodegaSeleccion = selection;
  }

  getEnBodega() {
    this.enBodega = null;
    this.enBodegaSeleccion = [];
    this.articulosService.getPorEstado(this.enBodegaFilters).subscribe(
      articulos => {
        this.enBodega = articulos.json().data.results;
        this.totalEnBodega = articulos.json().data.paging.total;
      },
      error => {
        this.toastr.error(error.json().error.message);
      }
    );
  }

  getEnTransito() {
    this.enTransito = null;
    this.articulosService.getPorEstado(this.enTransitoFilters).subscribe(
      articulos => {
        this.enTransito = articulos.json().data.results;
        this.totalEnTransito = articulos.json().data.paging.total;
      },
      error => {
        this.toastr.error(error.json().error.message);
      }
    );
  }

  getFacturacion() {
    this.facturacion = null;
    this.articulosService.getPorEstado(this.facturacionFilters).subscribe(
      articulos => {
        this.facturacion = articulos.json().data.results;
        this.totalFacturacion = articulos.json().data.paging.total;
      },
      error => {
        this.toastr.error(error.json().error.message);
      }
    );
  }

  getRutaNacional() {
    this.rutaNacional = null;
    this.articulosService.getPorEstado(this.rutaNacionalFilters).subscribe(
      articulos => {
        this.rutaNacional = articulos.json().data.results;
        this.totalRutaNacional = articulos.json().data.paging.total;
      },
      error => {
        this.toastr.error(error.json().error.message);
      }
    );
  }

  getEntregados() {
    this.entregados = null;
    this.articulosService.getPorEstado(this.entregadosFilters).subscribe(
      articulos => {
        this.entregados = articulos.json().data.results;
        this.totalEntregados = articulos.json().data.paging.total;
      },
      error => {
        this.toastr.error(error.json().error.message);
      }
    );
  }

  seleccionarTab(tab) {
    this.enBodegaSeleccionadas = false;
    this.enTransitoSeleccionadas = false;
    this.facturacionSeleccionadas = false;
    this.rutaNacionalSeleccionadas = false;
    this.entregadosSeleccionadas = false;
    this[tab] = true;
  }

  onEnBodegaFiltersChange(filters) {
    this.enBodegaFilters = filters;
    this.getEnBodega();
  }

  onEnTransitoFiltersChange(filters) {
    this.enTransitoFilters = filters;
    this.getEnTransito();
  }

  onFacturacionFiltersChange(filters) {
    this.facturacionFilters = filters;
    this.getFacturacion();
  }

  onRutaNacionalFiltersChange(filters) {
    this.facturacionFilters = filters;
    this.getFacturacion();
  }

  onEntregadosFiltersChange(filters) {
    this.entregadosFilters = filters;
    this.getEntregados();
  }

  onSubirFactura(articulo) {
    const formData: FormData = new FormData();
    formData.append(
      "factura",
      articulo.facturaExcel,
      articulo.facturaExcel.name
    );
    formData.append("precio", articulo.precio);
    Helpers.setLoading(true);
    this.articulosService.subirFactura(articulo.id, formData).subscribe(
      () => {
        this.toastr.success("Factura Agregada");
        Helpers.setLoading(false);
        this.getEnBodega();
      },
      error => {
        Helpers.setLoading(false);
        this.toastr.error(error.json().error.message);
      }
    );
  }

  onConsolidar() {
    Helpers.setLoading(true);
    this.articulosService
      .consolidar({ articulos: this.enBodegaSeleccion })
      .subscribe(
        () => {
          Helpers.setLoading(false);
          this.toastr.success("Articulos enviados a consolidar");
          this.getEnBodega();
        },
        error => {
          Helpers.setLoading(false);
          this.toastr.error(error.json().error.message);
        }
      );
  }

  onEmbarcar() {
    Helpers.setLoading(true);
    this.articulosService
      .embarcar({ articulos: this.enBodegaSeleccion })
      .subscribe(
        () => {
          Helpers.setLoading(false);
          this.toastr.success("Articulos enviados a embarcar");
          this.getEnBodega();
        },
        error => {
          Helpers.setLoading(false);
          this.toastr.error(error.json().error.message);
        }
      );
  }

  verImagenes(articulo, modal) {
    this.articulo = articulo;
    this.ngbModal.open(modal, { size: "lg" });
  }
}
