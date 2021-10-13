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
import { EstadoArticuloService } from "../../../../../shared/services/api/estado-articulo.service";
import { UsuariosService } from "../../../../../shared/services/api/usuarios.service";
import { NotificacionesService } from "../../../../../shared/services/api/notificaciones.service";
import {ResponseContentType} from "@angular/http";
import {ExcelWorkService} from "../../../../../shared/services/excel/excel-work.service";
import {Declaracion} from "../../../../../shared/model/declaracion.model";
import {Articulo} from "../../../../../shared/model/articulo.model";
import {PaisesService} from "../../../../../shared/services/api/paises.service";
import {Country} from "../../../../../shared/model/country.model";
import {Big} from 'big.js';
import { Entrega } from "../../../../../shared/model/entrega.model";
import { EntregaService } from "../../../../../shared/services/api/entrega.service";
import { City } from "../../../../../shared/model/city.model";
import { Province } from "../../../../../shared/model/province.model";
import { ProvinciasService } from "../../../../../shared/services/api/provincias.service";
import { CiudadesService } from "../../../../../shared/services/api/ciudades.service";
import { AuthRoutingModule } from "../../../../../auth/auth-routing.routing";
import { Arancel } from "../../../../../shared/model/arancel.model";
import { ArancelesService } from "../../../../../shared/services/api/aranceles.service";
@Component({
  selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
  templateUrl: "./mi-casillero-lista.component.html",
  encapsulation: ViewEncapsulation.None,
  styles: []
})
export class MiCasilleroListaComponent extends BaseListComponent
  implements OnInit {
    parroquias: City[]=null;
    parroquiasR: City[]=null;
    datos: any;
    file:any;
    unidades:number = 0;
    dv = false;
    consolidadoFact = false;
    consolidadoArt = false;
    aranceles: Arancel[];
    arancelesCat: Arancel[];
    arancel: any = 'B';
    nombreTrackbox: any = '';
    valorFactura: any = 0;
    modalRef = null;
    selectionPrecios: any;
  usuario: any;
  enBodega: any[];
  estatus: any[];
  instrucciones: any[];
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
  instruccionesSeleccionadas = false;
  facturacionSeleccionadas = false;
  rutaNacionalSeleccionadas = false;
  entregadosSeleccionadas = false;
  embarcadosSeleccionadas = false;
  estatusSeleccionadas = false;
  validar= false;
  ids:any[] = [];
  enBodegaSeleccion: any;
  estatusSeleccion: any;
  instruccionesSeleccion: any;
  estaConsolidado = false;
  totalEnBodega = 0;
  totalInstrucciones = 0;
  totalEnTransito = 0;
  totalFacturacion = 0;
  totalRutaNacional = 0;
  totalEntregados = 0;
  totalEmbarcados = 0;
  totalEstatus = 0;
  confirmar: boolean = false;
  mensaje: boolean = false;
  totalPeso = 0;
  totalPrecio = 0;
  estadosArticulo : any;
  entrega:Entrega;
  provincias:Province[];
  ciudades:City[];
  provinciasR:Province[];
  ciudadesR:City[];
  paisesEntrega:Country[];
  articulosDatos:any[];
  public selectUsuario: any =1;
  domicilio = 1;
  disabled = false;
  otroUsuario = false;
  disabledDir = false;
  totalPesoEnt = 0;
  tpeso = 0;
  totalPrecioEnt =0;
  totalPiezas =0;
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

 instruccionesFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 1,
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

  estatusFilters = {
    limit: 5,
    offset: 0,
    estado_articulo_id: 0,
    estado: -1,
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
  articulosLista: any[] = [];
  existeprecio: boolean = true;
  total:number= 0;
  public pais_destino_d_v_id: any;
  public pais_origen_d_v_id: any;
  paqueteList: Array<any> = [];
  declaracion: Declaracion;
  trackbox:string = '';
  public totalDescripciones:number = 0;
  importer_usuario_DV = null;
  remitente_usuario_DV = null;
  articulodv: Articulo;
  paises:Country[]=[];
  idlist:number;
  editField: string;
  puedeDV: boolean = true;
  puedeEntrega: boolean = true;
  usuarioRetirar:string;
  constructor(
    public router: Router,
    public articulosService: ArticulosService,
    public toastr: ToastsManager,
    public usuariosService: UsuariosService,
    public ngbModal: NgbModal,
    public vcr: ViewContainerRef,
    public appService: AppService,
    public notificacionService: NotificacionesService,
    public excelWorkService: ExcelWorkService,
    public paisesService: PaisesService,
    public estadosService: EstadoArticuloService,
    public entregaService: EntregaService,
    public provinciaService: ProvinciasService,
    public ciudadService: CiudadesService,
    public arancelesService: ArancelesService
  ) {
    super(router, toastr, vcr, appService);
    this.url = "/mi-casillero";
    this.appService.title = "CASILLERO";
  }

  ngOnInit() {
    this.getArancelesCat();
    this.getUsuarios();
    this.getEnBodega();
    this.getEnTransito();
    this.getEmbarcados();
    this.getFacturacion();
    this.getRutaNacional();
    this.getEntregados();
    this.getEstatus();
    this.getInstrucciones();
    this.getPaisesE();
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

  onEstatusSelectionChange(selection) {
    this.estatusSeleccion = selection;
  }

  onInstruccionesSelectionChange(selection) {
    this.instruccionesSeleccion = selection;
  }

  onArticuloChange(selection) {
    this.articulosDatos = selection;
  }

  getEnBodega() {
    this.enBodega = null;
    this.enBodegaSeleccion = [];
    this.valorFactura = 0;
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

  getEstatus() {
    this.estatus = null;
    this.estatusSeleccion = [];
    this.articulosService.getPorEstado(this.estatusFilters).subscribe(
      articulos => {
        this.getEstados();
        this.estatus = articulos.json().data[0].results;
        this.totalEstatus = articulos.json().data[0].paging.total;
        this.urlfactura = articulos.json().data[1];
      },
      error => {
        this.toastr.error(error.json().error.message);
      }
    );
  }

  getInstrucciones() {
    this.instrucciones = null;
    this.instruccionesSeleccion = [];
    this.articulosService.getPorEstado(this.instruccionesFilters).subscribe(
      articulos => {
        this.instrucciones = articulos.json().data[0].results;
        this.totalInstrucciones = articulos.json().data[0].paging.total;
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
    this.instruccionesSeleccionadas = false;
    this.facturacionSeleccionadas = false;
    this.rutaNacionalSeleccionadas = false;
    this.entregadosSeleccionadas = false;
    this.embarcadosSeleccionadas = false;
    this.estatusSeleccionadas = false;
    this[tab] = true;
  }

  onEnBodegaFiltersChange(filters) {
    this.enBodegaFilters = filters;
    this.getEnBodega();
  }

  onEstatusFiltersChange(filters) {
    this.estatusFilters = filters;
    this.getEstatus();
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

  onInstruccionesFiltersChange(filters) {
    this.instruccionesFilters = filters;
    this.getInstrucciones();
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
    formData.append('tipo', articulo.tipo);
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
        if(this.datos[i].costo == null ||this.datos[i].costo <= 0 ||this.datos[i].costo == '0.00' )
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
      let unidadesCons:any[] = [];
      let descCons:any[] = [];
      let existe = false;
      let existeDesc = false;
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
          if(!this.articulos[i].descripcion_embarque || this.articulos[i].descripcion_embarque == '')
          existeDesc = true;
         else{
          descCons[i] = {
            id : this.articulos[i].id,
            descripciones: this.articulos[i].descripcion_embarque
          };
        }
        }
      }
      if(!existe && !existeDesc){
        this.modalRef.close();
        this.articulosService
        .embarcar({articulos: this.ids,remitente:this.remitente_usuario,importer:this.importer_usuario, remitente_text:this.text,
        nota: this.notaembarque, descripcion:this.descripcionembarque,unidades:this.unidades,unidadesMasivas:unidadesCons,categoria:this.arancel,descMasiva : descCons})
        .subscribe(
          () => {
            Helpers.setLoading(false);
            this.toastr.success("Artículos enviados a embarcar");
            this.enBodegaSeleccion = [];
            this.filters.articulos = this.enBodegaSeleccion;
            this.getEnBodega();
            this.getEmbarcados();
          },
          error => {
            Helpers.setLoading(false);
            this.toastr.error(error.json().error.message);
          }
        );
      }else{
        if(existe)
          this.toastr.error('Debe asignar unidades físicas a todos los artículos.');
        if(existeDesc)
          this.toastr.error('Debe ingresar las descripciones a todos los artículos.');
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

  onEmbarcar(content) {
    let existe=false;
    this.remitente_usuario = null;
    this.importer_usuario = null;
    
    this.existeRemitente = false;
    this.existeImporter = false;
    Helpers.setLoading(true);
    for (let i in this.datos){
        if(this.datos[i].costo == null ||this.datos[i].costo <= 0 ||this.datos[i].costo == '0.00' )
            existe= true;    
    }
    if(existe || !this.existeprecio){
      if(!this.existeprecio){
        this.toastr.error('Debe guardar el precio de algún artículo seleccionado');
          Helpers.setLoading(false);
      }else{
        this.toastr.error('El costo debe ser mayor que cero');
        Helpers.setLoading(false);
      }
    }else{
      this.getUsuarios();
    this.articulosService
      .embarcarModal({ articulos: this.enBodegaSeleccion })
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
  if(!this.valorFactura || this.valorFactura == 0 || this.valorFactura == ''){
    this.toastr.error('El costo debe ser mayor que cero.'); 
  }else{
    this.modalRef.close();
    Helpers.setLoading(true);
    const formData: FormData = new FormData();
    formData.append('factura', this.file, this.file.name);
    formData.append('articulos', this.enBodegaSeleccion);
    formData.append('nombre', this.nombreTrackbox);
    formData.append('valor', this.valorFactura);
     this.articulosService.subirFacturaMasiva(formData).subscribe(() => {
        this.toastr.success("Factura Agregada");
        Helpers.setLoading(false);
        this.getEnBodega();

    }, error => {
        Helpers.setLoading(false);
        this.toastr.error(error.json().error.message);
    });  
  }

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

onPuedeDV(element) {
  this.puedeDV = element;
}

onPuedeEntrega(element) {
  this.puedeEntrega = element;
}

OnModalFactura(content){
    this.file = null;
    this.valorFactura = 0;
    this.modalRef = this.ngbModal.open(content, {size: "lg"});
  
}

onEntrega(content){
  this.totalPrecioEnt = 0;
  this.totalPesoEnt = 0;
  this.totalPiezas = 0;
    this.entrega = new Entrega();
    this.entrega.ciudad = new City;
    this.entrega.ciudad_retiro = new City;
    this.entrega.parroquia_retiro = new City;
    this.entrega.ciudad.provincia = new Province;
    this.entrega.parroquia = new City;
    this.entrega.ciudad_retiro.provincia = new Province;
    this.entrega.ciudad.provincia.pais = new Country;
    this.entrega.ciudad.provincia.pais.id= 8;
    this.getProvincias(this.entrega.ciudad.provincia.pais.id);
    this.entrega.ciudad_retiro.provincia.pais = new Country;
    this.entrega.ciudad_retiro.provincia.pais.id= 8;
    this.getProvinciasR(this.entrega.ciudad_retiro.provincia.pais.id);
    this.entrega.domicilio = 1;
    this.entrega.articulos= this.articulosDatos;
    this.usuarioRetirar = this.entrega.articulos[0].usuario ? this.entrega.articulos[0].usuario.numero_identidad : (this.entrega.articulos[0].extra ? this.entrega.articulos[0].extra.identificacion : null );
    this.getDireccion(this.usuarioRetirar);
    for(let i in this.entrega.articulos){
      let c = Big(this.entrega.articulos[i].precio);
      this.totalPrecioEnt = c.plus(this.totalPrecioEnt);
      let peso = Big(this.entrega.articulos[i].peso);
      this.totalPesoEnt = peso.plus(this.totalPesoEnt);
      let piezas = Big(this.entrega.articulos[i].piezas);
      this.totalPiezas = piezas.plus(this.totalPiezas);
      
      let pesolistado = Big(this.entrega.articulos[i].peso);
      this.entrega.articulos[i].peso = pesolistado.toNumber(); 
      let tpesolistado = Big( this.totalPesoEnt);
      this.totalPesoEnt = tpesolistado.toNumber();
  }

 
  this.modalRef = this.ngbModal.open(content, {size: "lg"});
 
}
domicilioValue(value){
  this.domicilio = value;
  this.disabled = false;
 
  this.disabledDir = false;
  if(this.domicilio == 2){
    this.entrega.ciudad_retiro.id = 4813;
      this.entrega.ciudad_retiro.provincia.pais.id = 8;
      this.entrega.ciudad_retiro.provincia.id = 895;
      this.entrega.ciudad_retiro.provincia.id = 895;
      this.getCiudadesR(this.entrega.ciudad_retiro.provincia.id);
      this.getParroquiasR(this.entrega.ciudad_retiro.id);
      this.entrega.parroquia_retiro = new City();
      this.entrega.ciudad_retiro_text = 'Guayaquil';
      this.disabled = true;
  }
  if(this.domicilio == 1 && this.selectUsuario == 1){
      if(this.usuarioRetirar != '')
          this.getDireccion(this.usuarioRetirar);
  }
  if(this.domicilio == 1 && this.selectUsuario == 0){
      this.entrega.ciudad.provincia.pais.id= 8;
      this.getProvincias(this.entrega.ciudad.provincia.pais.id);
}
}

selectedValue(value){
  this.selectUsuario = value;
  if(this.selectUsuario == 0){
      this.disabledDir = false;
      this.entrega.direccion = '';
      this.entrega.cedula = '';
      this.entrega.celular = '';
      this.entrega.codigo_postal = '';
      this.entrega.ciudad = new City();
      this.entrega.parroquia = new City();
      this.entrega.ciudad.provincia = new Province();
      this.entrega.ciudad.provincia.pais = new Country();
  }
  if(this.domicilio == 1 && this.selectUsuario == 1){
      if(this.usuarioRetirar != '')
          this.getDireccion(this.usuarioRetirar);
  }
  if(this.domicilio == 1 && this.selectUsuario == 0){
    this.entrega.ciudad.provincia.pais.id= 8;
    this.getProvincias(this.entrega.ciudad.provincia.pais.id);
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
  Helpers.setLoading(false);
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
  this.estadosService.getAll().subscribe((data) => {
      this.estadosArticulo = data.json().data;
  }, (error) => {
      this.toastr.error(error.json().message);
  });
}


onExportarEstatus() {
  Helpers.setLoading(true);
  let filters = {
    articulos: this.estatusSeleccion,
    q: this.estatusFilters.q,
    estado: this.estatusFilters.estado
  };
  this.articulosService.exportarEstatus(filters, ResponseContentType.Blob).subscribe(excel => {
      this.excelWorkService.downloadXLS('Paquetes.xlsx', excel);
      Helpers.setLoading(false);
  }, error => {
      this.toastr.error(error.json().error.message);
      Helpers.setLoading(false);
  });
}

OnModalDV(content) {
      this.totalDescripciones = 0;
      this.importer_usuario=null;
      this.remitente_usuario =null;
      this.paqueteList=[];
      this.getUsuarios();
      this.getPaises();
      this.declaracion = new Declaracion;
      this.articulodv= new Articulo;
      let fecha = new Date();
      this.articulodv.tienda_d_v = this.datos ? this.datos[0].remitente_text : '';
      this.importer_usuario=this.datos ? this.datos[0].consignatario : null;
      this.remitente_usuario =this.datos ? this.datos[0].remitente : null;
      if(this.articulodv.fecha_expiracion_d_v)
          fecha = new Date(this.articulodv.fecha_expiracion_d_v);
      
      this.articulodv.fecha_expiracion_d_v = {
          "year": fecha.getFullYear(),
          "month": fecha.getMonth() + 1,
          "day": fecha.getDate()
      };
      this.pais_origen_d_v_id = 9;
      this.pais_destino_d_v_id = 8;
        const person =  [{ id: 0 , descripcion: 'N/A', cantidad: 0 , vunitario: 0, total: 0 }];
      this.paqueteList.push(person); 
      this.modalRef = this.ngbModal.open(content, {size: "lg"});

}

onExportarInstrucciones() {
  Helpers.setLoading(true);
  let filters = {
    articulos: this.instruccionesSeleccion,
    q: this.instruccionesFilters.q  };
  this.entregaService.exportarInstrucciones(filters, ResponseContentType.Blob).subscribe(excel => {
      this.excelWorkService.downloadXLS('Entregas.xlsx', excel);
      Helpers.setLoading(false);
  }, error => {
      this.toastr.error(error.json().error.message);
      Helpers.setLoading(false);
  });
}

getPaises() {
this.paises = null;
this.paisesService.getAll().subscribe((data) => {
    this.paises = data.json().data;
}, (error) => {
    this.toastr.error(error.json().error.message);
});
}

updateList(id: number, property: string, event: any) {
this.paqueteList[0][id][property] = event.target.textContent;

if(this.paqueteList[0][id]['cantidad'] && this.paqueteList[0][id]['vunitario']){
  let c = Big(this.paqueteList[0][id]['cantidad']);
  let v = Big(this.paqueteList[0][id]['vunitario']);
  this.paqueteList[0][id]['total'] = c.mul(v);
  let t = Big(this.paqueteList[0][id]['total']);
  let td = Big(this.totalDescripciones);
  this.totalDescripciones = t.plus(td);
}
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

onSubmit(value) {
  let existe = false;
  if(this.paqueteList[0].length > 0){
    for(let i in this.paqueteList[0]){
      if(this.paqueteList[0][i].descripcion =='' || this.paqueteList[0][i].descripcion =='N/A' || this.paqueteList[0][i].cantidad==''|| this.paqueteList[0][i].vunitario==''|| this.paqueteList[0][i].cantidad==0 || this.paqueteList[0][i].vunitario==0 || this.paqueteList[0][i].total==0){
        existe = true;
        break;
      }
    }
  }else{
    existe = true;
  }
  if(!existe){
  Helpers.setLoading(true);
  this.enBodegaSeleccion = [];
  this.filters.articulos = this.enBodegaSeleccion;
  this.modalRef.close();
  this.articulosService.declaracionValoresMasiva(value).subscribe( (pdf) => {
    //  this.excelWorkService.downloadXLS(this.trackbox +'.pdf', pdf);
      Helpers.setLoading(false);
      this.toastr.success("Declaración de valores masiva creada")
      this.getEnBodega();
  }, error => {
      Helpers.setLoading(false);
     this.toastr.error(error.json().error.message);
  });
}else{
  Helpers.setLoading(false);
     this.toastr.error('Debe llenar correctamente las descripciones'); 
}
}

getPaisesE() {
  this.paisesService.getAll().subscribe((data) => {
      this.paisesEntrega = data.json().data;
    
  }, (error) => {
      console.log(error.json());
  });
}

onSubmitEntrega(entrega) {
  this.modalRef.close();
  Helpers.setLoading(true);
  entrega.articulos = this.instruccionesSeleccion;
  this.entregaService.create(entrega).subscribe( () => {
      Helpers.setLoading(false);
      this.toastr.success("Entrega creada");
       // this.envioUpdated.emit();
       this.getInstrucciones();
  }, error => {
      Helpers.setLoading(false);
      if(error.json().data)
          this.toastr.error(error.json().data.error);
      if(error.json().error)
          this.toastr.error(error.json().error.message);
      
  });
}

getProvincias(pais_id) {
this.provincias = null;
this.ciudades = null;
this.provinciaService.getAll({pais_id: pais_id}).subscribe((data) => {
    this.provincias = data.json().data;
}, (error) => {
    console.log(error.json());
});
}

getProvinciasR(pais_id) {
this.provincias = null;
this.ciudades = null;
this.provinciaService.getAll({pais_id: pais_id}).subscribe((data) => {
  this.provinciasR = data.json().data;
}, (error) => {
  console.log(error.json());
});
}

getCiudades(provincia_id) {
this.ciudades = null;
this.ciudadService.getAll({provincia_id: provincia_id}).subscribe((data) => {
    this.ciudades = data.json().data;
}, (error) => {
    console.log(error.json());
});
}

getCiudadesR(provincia_id) {
this.ciudadesR = null;
this.ciudadService.getAll({provincia_id: provincia_id}).subscribe((data) => {
  this.ciudadesR = data.json().data;
 
}, (error) => {
  console.log(error.json());
});
}

onConversion(articulo){
  this.totalPesoEnt = 0;
  for(let i in articulo){
      if(this.tpeso == 1){
          let peso = Big(articulo[i]['peso']);
          let conv = peso.div(2.2046);
          articulo[i]['peso'] = conv.toNumber();
      }else{
          let peso = Big(articulo[i]['peso']);
          let conv = peso.mul(2.2046);
          articulo[i]['peso'] = conv.toNumber();
      }
      let pesoT = Big(articulo[i]['peso']);
      this.totalPesoEnt = pesoT.plus(this.totalPesoEnt);
      let t= Big(this.totalPesoEnt);
      this.totalPesoEnt = t.toNumber();
  }
}

getDireccion(id){console.log('sdf');
  this.disabledDir = false;
  this.entrega.direccion = '';
  this.entrega.codigo_postal = '';
  this.entrega.ciudad = new City();
  this.entrega.parroquia = new City();
  this.entrega.ciudad.provincia = new Province();
  this.entrega.ciudad.provincia.pais = new Country();
  this.entrega.direccion = '';
  this.entrega.celular = '';
  this.entrega.cedula = '';
  for(let i in this.usuarios){
      if(this.usuarios[i].numero_identidad === id){
          this.entrega.direccion = this.usuarios[i].direccion;
          this.entrega.codigo_postal = this.usuarios[i].codigo_postal;
          this.entrega.ciudad.id = this.usuarios[i].ciudad_id;
          this.entrega.parroquia.id = this.usuarios[i].parroquia_id;
          this.entrega.ciudad.provincia.id = this.usuarios[i].provincia_id;
          this.entrega.ciudad.provincia.pais.id = this.usuarios[i].pais_id;
          this.getProvincias(this.entrega.ciudad.provincia.pais.id);
          this.getCiudades(this.entrega.ciudad.provincia.id);
          this.getParroquias(this.entrega.ciudad.id);
          this.entrega.celular = this.usuarios[i].celular;
          this.entrega.cedula = this.usuarios[i].numero_identidad;
          this.disabledDir = true;
      }
         
  }
}

getArancelesCat() {
  this.arancelesService.categoria().subscribe(aranceles => {
      this.arancelesCat = aranceles.json().data;
  });
}

getParroquias(ciudad_id) {
  this.parroquias = null;
  this.ciudadService.getParroquiasByCiudad({ciudad_id: ciudad_id}).subscribe((data) => {
      this.parroquias = data.json().data;
  }, (error) => {
      console.log(error.json());
  });
}

getParroquiasR(ciudad_id) {
  this.parroquiasR = null;
  this.ciudadService.getParroquiasByCiudad({ciudad_id: ciudad_id}).subscribe((data) => {
      this.parroquiasR = data.json().data;
  }, (error) => {
      console.log(error.json());
  });
}
}
