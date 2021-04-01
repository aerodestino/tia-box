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
    datos: any;
    file:any;
    nombreTrackbox: any = '';
    modalRef = null;
    selectionPrecios: any;
  usuario: any;
  enBodega: any[];
  enTransito: any[];
  facturacion: any[];
  rutaNacional: any[];
  entregados: any[];
  articulo: any;
  puedeFactura: boolean = true;
  totalFactura: boolean = true;
  urlfactura: any;
  enBodegaSeleccionadas = true;
  enTransitoSeleccionadas = false;
  facturacionSeleccionadas = false;
  rutaNacionalSeleccionadas = false;
  entregadosSeleccionadas = false;

  enBodegaSeleccion: any;

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
    this.appService.title = "CASILLERO";
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
        this.enBodega = articulos.json().data[0].results;
        this.totalEnBodega = articulos.json().data[0].paging.total;
        this.urlfactura = articulos.json().data[1];
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
        this.enTransito = articulos.json().data[0].results;
        this.totalEnTransito = articulos.json().data[0].paging.total;
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
        this.facturacion = articulos.json().data[0].results;
        this.totalFacturacion = articulos.json().data[0].paging.total;
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
        this.rutaNacional = articulos.json().data[0].results;
        this.totalRutaNacional = articulos.json().data[0].paging.total;
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
        this.entregados = articulos.json().data[0].results;
        this.totalEntregados = articulos.json().data[0].paging.total;
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
    if( articulo.precio <= 0 || articulo.precio <= 0.00 ){
      this.toastr.error('El costo debe ser mayor que cero');
      Helpers.setLoading(false);
    }else{
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
  }

  onConsolidar() {
    let existe=false;
    
    for (let i in this.datos){
        if(this.datos[i] == null ||this.datos[i] <= 0 ||this.datos[i] == '0.00' )
            existe= true;    
    }
    if(existe || this.selectionPrecios){
      if(this.selectionPrecios){
        this.toastr.error('Debe guardar el precio de algún artículo seleccionado');
          Helpers.setLoading(false);
      }else{
        this.toastr.error('El costo debe ser mayor que cero');
        Helpers.setLoading(false);
      }
    }else{
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
  }

  onEmbarcar() {
    let existe=false;
    
    for (let i in this.datos){
        if(this.datos[i] == null ||this.datos[i] <= 0 ||this.datos[i] == '0.00' )
            existe= true;    
    }
    if(existe || this.selectionPrecios){
      if(this.selectionPrecios){
        this.toastr.error('Debe guardar el precio de algún artículo seleccionado');
          Helpers.setLoading(false);
      }else{
        this.toastr.error('El costo debe ser mayor que cero');
        Helpers.setLoading(false);
      }
    }else{
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
  }

  verImagenes(articulo, modal) {
    Helpers.setLoading(true);
    this.articulosService
      .getImagenes({ id: articulo })
      .subscribe(
        (dato) => {
          Helpers.setLoading(false);
         this.articulo= dato.json().data;
         this.ngbModal.open(modal, { size: "lg" });
        },
        error => {
          Helpers.setLoading(false);
          this.toastr.error('Ocurrió un error cargando las imágenes');
        }
      );
    
  }

  onSubirFacturaInput(event) {
    if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];
    }
}


onSubmitFactura() {
    Helpers.setLoading(true);
    const formData: FormData = new FormData();
    console.log(this.file.name);
    formData.append('factura', this.file, this.file.name);
    formData.append('articulos', this.enBodegaSeleccion);
    formData.append('nombre', this.nombreTrackbox);
     this.articulosService.subirFacturaMasiva(formData).subscribe(() => {
        this.toastr.success("Factura Agregada");
        Helpers.setLoading(false);
        window.location.reload();

    }, error => {
        Helpers.setLoading(false);
        this.toastr.error(error.json().error.message);
    });  
}

onDatos(element) {
  this.datos = element;
}

onPuedeFactura(element) {
  this.puedeFactura = element;
}

onTotalFactura(element) {
  this.totalFactura = element;
}

OnModalFactura(content){
    let existe=false;
    
    for (let i in this.datos){
        if(this.datos[i] == null ||this.datos[i] <= 0 ||this.datos[i] == '0.00' )
            existe= true;    
    }
    if(existe || this.selectionPrecios){
      if(this.selectionPrecios){
        this.toastr.error('Debe guardar el precio de algún artículo seleccionado');
          Helpers.setLoading(false);
      }else{
        this.toastr.error('El costo debe ser mayor que cero');
        Helpers.setLoading(false);
      }
    }else{
    this.modalRef = this.ngbModal.open(content, {size: "lg"});
    }
}

close(){
  this.modalRef.close();
}

onTrackbox(element) {
  this.nombreTrackbox = element;
}

onSelectionPrecios(element) {
  this.selectionPrecios = element;
}

}
