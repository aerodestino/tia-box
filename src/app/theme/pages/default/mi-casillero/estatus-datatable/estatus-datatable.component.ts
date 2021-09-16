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
import { EntregaService } from "../../../../../shared/services/api/entrega.service";
import { ProvinciasService } from "../../../../../shared/services/api/provincias.service";
import { CiudadesService } from "../../../../../shared/services/api/ciudades.service";
import { City } from "../../../../../shared/model/city.model";
import { Province } from "../../../../../shared/model/province.model";
import { Entrega } from "../../../../../shared/model/entrega.model";
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
  ciudades:City[];
  provincias:Province[];
  ciudadesR:City[];
  provinciasR:Province[];
  selectUsuario=1;
  usuarioRetirar:any;
  entrega:Entrega;
  paisesEntrega:Country[];
  domicilio = 1;
  disabled = false;
  titulo = 'Crear Entrega';
  @Input() url: any;
  @Output() entregaSelection: EventEmitter<any> = new EventEmitter();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  @Output() articuloChange: EventEmitter<any> = new EventEmitter();
  @Output() cargar: EventEmitter<any> = new EventEmitter();
  @Output() ver: EventEmitter<any> = new EventEmitter();
  otroUsuario = false;
  disabledDir = false;
  totalPeso = 0;
  tpeso = 0;
  totalPrecio=0;
  totalPiezas =0;
  selectionIds: string[];
  selectionArticulo: any[];
  precios: any[];
  parroquias: City[]=null;
  parroquiasR: City[]=null;
  constructor(private _script: ScriptLoaderService, public ngbModal: NgbModal, 
    public articuloService: ArticulosService,public toastr: ToastsManager,
    public usuariosService: UsuariosService,
    public paisService: PaisesService,
    public entregaService: EntregaService,
    public provinciaService: ProvinciasService,
    public ciudadService: CiudadesService,
    public appService: AppService) {
    super(ngbModal);
  }

  ngOnInit() {
    this.getPaisesE(); 
    this.getUsuarios();
    this.domicilio = 1;
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

  onConversion(articulo){
    this.totalPeso = 0;
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
        this.totalPeso = pesoT.plus(this.totalPeso);
        let t= Big(this.totalPeso);
        this.totalPeso = t.toNumber();
    }
}

  changeAllState() {
    this.selectedAll = true;
    this.data.forEach(skumaster => {
      if (!skumaster.selected) this.selectedAll = false;
    });
    this.emitSelectionChange();
  }

  getDireccion(id){
    this.disabledDir = false;
    this.entrega.direccion = '';
    this.entrega.codigoPostal = '';
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
            this.entrega.codigoPostal = this.usuarios[i].codigo_postal;
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
    this.selectionArticulo = [];
    let existe = 0;
    this.data.forEach(item => {
      if (item.selected){
        this.selectionIds.push(item.id);
        this.selectionArticulo.push(item);
        if((item.estado_articulo.id == 3 || item.estado_articulo.id == 4) && !item.entrega)
          existe++;
      } 
    });
    this.articuloChange.emit(this.selectionArticulo);
    (existe == this.selectionIds.length) ? this.entregaSelection.emit(false) : this.entregaSelection.emit(true);
    this.selectionChange.emit(this.selectionIds);
  
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

onVer(articulo, modal) {
  this.detalles = articulo;
  this.ngbModal.open(modal, { size: "lg" });
     
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

View(content, entrega,tipo) {
  this.tpeso = 0;
  this.totalPeso = 0;
  this.totalPiezas = 0;
  Helpers.setLoading(true);
//  this.entregaService.getById(id).subscribe(resource => {
      this.entrega = entrega;
      this.domicilio = entrega.domicilio;
      for(let i in entrega.articulo){
        let c = Big(entrega.articulo[i].precio);
        this.totalPrecio = c.plus(this.totalPrecio);
        let peso = Big(entrega.articulo[i].peso);
        this.totalPeso = peso.plus(this.totalPeso);
        let piezas = Big(entrega.articulo[i].piezas);
        this.totalPiezas = piezas.plus(this.totalPiezas);
        
        let pesolistado = Big(entrega.articulo[i].peso);
        entrega.articulo[i].peso = pesolistado.toNumber(); 
        let tpesolistado = Big( this.totalPeso);
        this.totalPeso = tpesolistado.toNumber(); 
    }
  
      if(tipo == 0){
        if(!this.entrega.usuario && !this.entrega.extra ){
          this.selectUsuario = 0;
        }else{
          this.selectUsuario = 1;
          if(this.entrega.usuario)
            this.usuarioRetirar = this.entrega.usuario.numero_identidad;
          if(this.entrega.extra)
             this.usuarioRetirar = this.entrega.extra.identificacion;
        }
        if(this.entrega.ciudad){
          this.getProvincias(this.entrega.ciudad.provincia.pais.id);
          this.getCiudades(this.entrega.ciudad.provincia.id);
          this.getParroquias(this.entrega.ciudad.id);
        }else{
          this.entrega.ciudad = new City();
          this.entrega.parroquia = new City();
          this.entrega.ciudad.provincia = new Province();
          this.entrega.ciudad.provincia.pais = new Country();
        }

        if(this.entrega.ciudad_retiro){
          this.getProvinciasR(this.entrega.ciudad_retiro.provincia.pais.id);
          this.getCiudadesR(this.entrega.ciudad_retiro.provincia.id);
          this.getParroquiasR(this.entrega.ciudad_retiro.id);
        }else{
          this.entrega.ciudad_retiro= new City();
          this.entrega.parroquia_retiro= new City();
          this.entrega.ciudad_retiro.provincia = new Province();
          this.entrega.ciudad_retiro.provincia.pais = new Country();
          this.entrega.ciudad_retiro.provincia.pais.id = 8;
          this.getProvinciasR(this.entrega.ciudad_retiro.provincia.pais.id);
        }
        this.domicilioValue(this.domicilio);
        this.titulo = 'Editar Entrega';
      }else{
        this.titulo = 'Crear Entrega';
      }
     
      Helpers.setLoading(false);
      this.modalRef = this.ngbModal.open(content, {size: "lg"});

/*  }, (error) => {
      this.toastr.error(error.json().message);
      Helpers.setLoading(false);
  }); */
}

domicilioValue(value){
  this.domicilio = value;
  this.disabled = false;
 
  this.disabledDir = false;
  if(this.domicilio == 2){
    this.entrega.ciudad_retiro.id = 4813;
      this.entrega.ciudad_retiro.provincia.pais.id = 8;
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
      this.entrega.codigoPostal = '';
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

getPaisesE() {
  this.paisService.getAll().subscribe((data) => {
      this.paisesEntrega = data.json().data;
    
  }, (error) => {
      console.log(error.json());
  });
}

onSubmitEntrega(entrega) {
  this.modalRef.close();
  entrega.id = this.entrega.id;
  console.log(entrega.id);
  Helpers.setLoading(true);
  this.entregaService.update(entrega).subscribe( () => {
      Helpers.setLoading(false);
      this.toastr.success("Entrega actualizada");
       this.cargar.emit();
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
this.ciudadService.getPrincipal({provincia_id: provincia_id}).subscribe((data) => {
    this.ciudades = data.json().data;
}, (error) => {
    console.log(error.json());
});
}

getCiudadesR(provincia_id) {
this.ciudadesR = null;
this.ciudadService.getPrincipal({provincia_id: provincia_id}).subscribe((data) => {
  this.ciudadesR = data.json().data;
 
}, (error) => {
  console.log(error.json());
});
}

getUsuarios() {
  this.usuarios = null;
  this.usuariosService.allUsuarios({usuario_id : (this.appService.user) ? this.appService.user.id : null }).subscribe((data) => {
      this.usuarios = data.json().data.results;
    
  }, (error) => {
      this.toastr.error(error.json().error.message);
  });
}

onDelete(content, id) {
  this.ngbModal.open(content).result.then((result) => {
      if (result == 'aceptar') {
        this.entregaService.delete(id).subscribe( () => {
          Helpers.setLoading(false);
          this.toastr.success("Entrega eliminada");
           this.cargar.emit();
      }, error => {
          Helpers.setLoading(false);
          if(error.json().data)
              this.toastr.error(error.json().data.error);
          if(error.json().error)
              this.toastr.error(error.json().error.message);
          
      });
      }
  });
}

}
