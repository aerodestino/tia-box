import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewEncapsulation
} from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { isNullOrUndefined } from "@swimlane/ngx-datatable/release/utils";
import { ToastsManager } from "ng2-toastr";
import { AppService } from "../../../../../app.service";
import { Helpers } from "../../../../../helpers";
import { BaseListComponent } from "../../../../../shared/prototypes/base-list";
import { ArticulosService } from "../../../../../shared/services/api/articulos.service";
import { UsuariosService } from "../../../../../shared/services/api/usuarios.service";
import { NotificacionesService } from "../../../../../shared/services/api/notificaciones.service";
import {ResponseContentType} from "@angular/http";
import {ExcelWorkService} from "../../../../../shared/services/excel/excel-work.service";
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
  embarcados: any[];
  facturacion: any[];
  rutaNacional: any[];
  entregados: any[];
  articulo: any;
  puedeFactura: boolean = true;
  consolidarPaquete: boolean = true;
  enviarPaquete: boolean = true;
  urlfactura: any;
  enBodegaSeleccionadas = true;
  enTransitoSeleccionadas = false;
  facturacionSeleccionadas = false;
  rutaNacionalSeleccionadas = false;
  entregadosSeleccionadas = false;
  embarcadosSeleccionadas = false;
  validar= false;
  ids:any[] = [];
  enBodegaSeleccion: any;
  estaConsolidado = false;
  totalEnBodega = 0;
  totalEnTransito = 0;
  totalFacturacion = 0;
  totalRutaNacional = 0;
  totalEntregados = 0;
  totalEmbarcados = 0;
  confirmar: boolean = false;
  mensaje: boolean = false;
  totalPeso = 0;
  totalPrecio = 0;
  estadosArticulo : any;
  enBodegaFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 2,
    q: ''
  };

  enTransitoFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 3,
    q: ''
  };

  embarcadosFilters = {
    limit: 5,
    offset: 0,
    q: ''
  };

  facturacionFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 4,
    q: ''
  };

  rutaNacionalFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 5,
    q: ''
  };

  entregadosFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 6,
    q: ''
  };
  importer_usuario = null;
  remitente_usuario = null;
  existeImporter:boolean = false;
  existeRemitente:boolean = false;
  text = '';
  articulos: any[]= [];
  usuarios: any[]= [];
  usuarios_importer: any[]= [];
  notaembarque:string = '';
  descripcionembarque: string= '';
  constructor(
    public router: Router,
    public articulosService: ArticulosService,
    public toastr: ToastsManager,
    public usuariosService: UsuariosService,
    public ngbModal: NgbModal,
    public vcr: ViewContainerRef,
    public appService: AppService,
    public notificacionService: NotificacionesService,
    public excelWorkService: ExcelWorkService
  ) {
    super(router, toastr, vcr, appService);
    this.url = "/mi-casillero";
    this.appService.title = "CASILLERO";
  }

  ngOnInit() {
    this.getUsuarios();
    this.getEnBodega();
    this.getEnTransito();
    this.getEmbarcados();
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

  getEmbarcados() {
    this.embarcados = null;
    this.articulosService.listEmbaque(this.embarcadosFilters).subscribe(
      articulos => {
        this.embarcados = articulos.json().data[0].results;
        this.totalEmbarcados = articulos.json().data[0].paging.total;
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
    this.embarcadosSeleccionadas = false;
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

  onEmbarcadosFiltersChange(filters) {
    this.embarcadosFilters = filters;
    this.getEmbarcados();
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

  negadaConfirmacion(){
    this.mensaje = false;
    this.confirmar= false;
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

  onSubmitEmbarcar() {
    if(this.confirmar){
    Helpers.setLoading(true);
    this.modalRef.close();
    this.articulosService
      .embarcar({articulos: this.ids,remitente:this.remitente_usuario,importer:this.importer_usuario, remitente_text:this.text,
        nota: this.notaembarque, descripcion:this.descripcionembarque})
      .subscribe(
        () => {
          Helpers.setLoading(false);
          this.toastr.success("Artículos enviados a embarcar");
          this.getEnBodega();
          this.getEmbarcados();  
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

  onEmbarcar(content) {
    let existe=false;
    this.remitente_usuario = null;
    this.importer_usuario = null;
    this.text = '';
    this.existeRemitente = false;
    this.existeImporter = false;
    this.estaConsolidado = false;
    Helpers.setLoading(true);
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
      .embarcarModal({ articulos: this.enBodegaSeleccion })
      .subscribe(
        (datos) => {
          Helpers.setLoading(false);
          this.notaembarque = '';
          this.descripcionembarque = '';
          this.articulos = datos.json().data[0];
          this.totalPeso = 0;
          this.totalPrecio = 0;
          let sumPrecio = 0;
          let sumPeso = 0;
          for(let i in this.articulos){
              sumPrecio = sumPrecio + this.articulos[i].precio;
              sumPeso = sumPeso + this.articulos[i].peso;
              if(this.articulos[i].consolidado)
                this.estaConsolidado = true;
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
    formData.append('factura', this.file, this.file.name);
    formData.append('articulos', this.enBodegaSeleccion);
    formData.append('nombre', this.nombreTrackbox);
     this.articulosService.subirFacturaMasiva(formData).subscribe(() => {
        this.toastr.success("Factura Agregada");
        Helpers.setLoading(false);
        this.getEnBodega();

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

onConsolidarPaquete(element) {
  this.consolidarPaquete = element;
}
onEnviarPaquete(element) {
  this.enviarPaquete = element;
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

onNoticias(content){
  this.modalRef = this.ngbModal.open(content, {size: "lg"});
}

leidas(){
    Helpers.setLoading(true);
    this.notificacionService.leidas().subscribe(() => {
      this.toastr.success("Noticias leídas");
      this.appService.notificacionesSinLeer = 0;
      this.appService.noticiasSinLeer = 0;
      this.notificacionService
        .noticias()
        .subscribe(notificaciones => {
              this.appService.noticias = notificaciones.json().data;
              this.appService.noticiasSinLeer = notificaciones.json().data.length;
         
        });
        this.modalRef.close();
        Helpers.setLoading(false);
  }, error => {
      Helpers.setLoading(false);
      this.toastr.error(error.json().error.message);
  });
}

onExportar() {
  Helpers.setLoading(true);
  let filters = {
    web: true,
    articulos: this.enBodegaSeleccion,
    q: this.enBodegaFilters.q
  };
  this.articulosService.exportar(filters, ResponseContentType.Blob).subscribe(excel => {
      this.excelWorkService.downloadXLS('Paquetes.xlsx', excel);
      Helpers.setLoading(false);
  }, error => {
      this.toastr.error(error.json().error.message);
      Helpers.setLoading(false);
  });
}

getEstados() {
  this.articulosService.getAll().subscribe((data) => {
      this.estadosArticulo = data.json().data;
  }, (error) => {
      this.toastr.error(error.json().message);
  });
}
}
