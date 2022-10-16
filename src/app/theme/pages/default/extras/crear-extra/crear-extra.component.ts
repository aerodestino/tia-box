import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ViewContainerRef
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { AppService } from "../../../../../app.service";
import { Extra } from "../../../../../shared/model/extra.model";
import { ExtrasService } from "../../../../../shared/services/api/extras.service";
import {Helpers} from "../../../../../helpers";
@Component({
  selector: "app-crear-extra",
  templateUrl: "./crear-extra.component.html",
  styles: []
})
export class CrearExtraComponent implements OnInit {
  returnUrl: string;
  @Output() creado: EventEmitter<any> = new EventEmitter();
  constructor(
    public appService: AppService,
    public extrasService: ExtrasService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.appService.title = "CREAR EXTRA";
  }
  ngOnInit() {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams["returnUrl"] || "/";
  }

  crearExtra(extra: Extra) {
    Helpers.setLoading(true);
    this.extrasService.create(extra).subscribe(
      () => {
        this.toastr.success("Extra creado");
        Helpers.setLoading(false);
        this.creado.emit();
      },
      errorResponse => {
				console.log({ errorResponse });
        Helpers.setLoading(false);
        try {
          this.toastr.error(errorResponse.json().error.message);
        } catch (error) {
					console.log({ errorResponse });
          Helpers.setLoading(false);
				}
      }
    );
  }

}
