import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastsManager } from "ng2-toastr";
import { Helpers } from "../../../../../helpers";
import { BaseDatatableComponent } from "../../../../../shared/prototypes/base-datatable";
import { ExtrasService } from "../../../../../shared/services/api/extras.service";
import { CanService } from "../../../../../shared/services/auth/can.service";

@Component({
  selector: "app-extras-datatable",
  templateUrl: "./extras-datatable.component.html",
  styles: []
})
export class ExtrasDatatableComponent extends BaseDatatableComponent
  implements OnInit {
  documento: null;
  extra = null;
  public resource: any;
  public resourceData: any;
  @Output() verCupos: EventEmitter<any> = new EventEmitter();

  constructor(
    public ngbModal: NgbModal,
    private toastr: ToastsManager,
    public can: CanService,
    private extraService: ExtrasService
  ) {
    super(ngbModal);
  }

  ngOnInit() {
    this.page = this.filters.offset + 1;
    this.registroInicialPagina = this.filters.offset * this.filters.limit + 1;
    this.registroFinalPagina =
      this.registroInicialPagina + this.filters.limit > this.totalItems
        ? this.totalItems
        : this.registroInicialPagina + this.filters.limit - 1;
  }

  View(content, id) {
    this.resourceData = null;
    Helpers.setLoading(true);
    this.extraService.getById(id).subscribe(
      resource => {
        Helpers.setLoading(false);
        this.resourceData = resource.json().data;
        this.toastr.success("Datos Recuperados con exito.");
        this.ngbModal.open(content);
      },
      error => {
        Helpers.setLoading(false);
        this.toastr.error(error.json().message);
      }
    );
  }

  onSubirDocumento(id, event) {
    if (event.target.files && event.target.files[0]) {
      this.documento = event.target.files[0];

      const formData: FormData = new FormData();
      formData.append("identidad", this.documento);
      Helpers.setLoading(true);
      this.extraService.subirDocumento(id, formData).subscribe(
        res => {
          Helpers.setLoading(false);
          this.toastr.success("Documento Guardado");
        },
        error => {
          Helpers.setLoading(false);
          this.toastr.error(error.json().error.message);
        }
      );
    }
  }

  onVerCupos(extra) {
    this.verCupos.emit(extra);
  }

  verCuposExtra(extra, modal) {
    this.extra = extra;
    this.ngbModal.open(modal);
}
}
