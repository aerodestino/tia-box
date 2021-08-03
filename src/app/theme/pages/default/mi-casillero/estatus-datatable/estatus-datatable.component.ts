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
  @Input() url: any;
  @Output() entregaSelection: EventEmitter<any> = new EventEmitter();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  @Output() articuloChange: EventEmitter<any> = new EventEmitter();
  @Output() cargar: EventEmitter<any> = new EventEmitter();
  @Output() ver: EventEmitter<any> = new EventEmitter();

  selectionIds: string[];
  selectionArticulo: any[];
  precios: any[];
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
    this.selectionArticulo = [];
    let existe = 0;
    this.data.forEach(item => {
      if (item.selected){
        this.selectionIds.push(item.id);
        this.selectionArticulo.push(item);
        if((item.idestado == 3 || item.idestado == 4) && !item.entrega)
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


View(content, id,tipo) {
       
  this.entrega = null;
  Helpers.setLoading(true);
  this.entregaService.getById(id).subscribe(resource => {
      this.entrega = resource.json().data;
      this.getPaisesE();

      if(tipo == 0){
        if(!this.entrega.usuario && !this.entrega.extra ){
          this.selectUsuario = 0;
        }else{
          if(this.entrega.usuario)
           this.usuarioRetirar = this.entrega.usuario.numero_identidad;
          if(this.entrega.extra)
           this.usuarioRetirar = this.entrega.extra.identificacion;
        }
        if(this.entrega.ciudad){
          this.getProvincias(this.entrega.ciudad.provincia.pais.id);
          this.getCiudades(this.entrega.ciudad.provincia.id);
        }else{
          this.entrega.ciudad = new City();
          this.entrega.ciudad.provincia = new Province();
          this.entrega.ciudad.provincia.pais = new Country();
        }
        if(this.entrega.ciudad_retiro){
          this.getProvinciasR(this.entrega.ciudad_retiro.provincia.pais.id);
          this.getCiudadesR(this.entrega.ciudad_retiro.provincia.id);
        }else{
          this.entrega.ciudad_retiro= new City();
          this.entrega.ciudad_retiro.provincia = new Province();
          this.entrega.ciudad_retiro.provincia.pais = new Country();
        }

        if(this.entrega.domicilio)
          this.entrega.domicilio = 1;
        else
          this.entrega.domicilio = 0;
       
        this.getUsuarios();
        
      }
     
      Helpers.setLoading(false);
      this.modalRef = this.ngbModal.open(content, {size: "lg"});

  }, (error) => {
      this.toastr.error(error.json().message);
      Helpers.setLoading(false);
  });
}


domicilioValue(value){
this.entrega.domicilio = value;
}

selectedValue(value){
  this.selectUsuario = value;
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
