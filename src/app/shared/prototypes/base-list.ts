import { OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { AppService } from "../../app.service";
import { Helpers } from "../../helpers";
export abstract class BaseListComponent implements OnInit {
  /**
   * resource data
   */
  public data: any;
  /**
   * The list component route
   */
  public url: string;
  public firstLoad = true;
  /**
   * Indicates whether a certain resource is loading.
   */
  public loading = false;
  /**
   * The filters applied.
   */
  public filters: any = {
    limit: 5,
    offset: 0,
    q: "",
    sort: ""
  };
  /**
   * The sorts applied.
   */
  public sorts: any[] = [];

  public totalItems: number;

  /**
   * The selected Items from the table
   */
  public selectedItems: any[] = [];

  /**
   *  the resource service
   */
  public resourceService: any;

  public searching = false;

  constructor(
    public router: Router,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public appService: AppService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (this.appService.message) {
      this.toastr.success(this.appService.message);
      this.appService.message = null;
    }
  }

  /**
   * Gets the data.
   */
  getData() {
    this.data = null;
    this.searching = true;
    this.resourceService.list(this.filters).subscribe(
      data => {
        this.data = data.json().data.results;
        this.firstLoad = false;
        if (data.json().data.paging)
          this.totalItems = data.json().data.paging.total;
        this.searching = false;
        Helpers.setLoading(false);
        this.toastr.success("Datos recuperados correctamente");
      },
      error => {
        console.log( error.json() );
      }
    );
  }

  /**
   * Reload data when sort
   *
   * @param $event
   */
  onSort($event: any) {
    this.sorts = $event.sorts;
    this.filters.offset = 0;
    this.filters.sort = "";
    if (this.sorts[0]) {
      this.filters.sort += this.sorts[0].prop + "." + this.sorts[0].dir;
      for (let i = 1; i < this.sorts.length; i++) {
        this.filters.sort += "," + this.sorts[i].prop + "." + this.sorts[i].dir;
      }
    }
    this.getData();
  }

  /**
   * Goes to the create page.
   */
  onCreate() {
    this.router.navigate([`${this.url}/crear`], {
      queryParams: { returnUrl: this.url }
    });
  }

  /**
   * Goes to the view page.
   *
   * @param id The record id.
   */
  onView(id: number) {
    this.router.navigate([`${this.url}/${id}`], {
      queryParams: { returnUrl: this.url }
    });
  }

  /**
   * Goes to the update page.
   *
   * @param id The record id.
   */
  onUpdate(id: string | number) {
    this.router.navigate([`${this.url}/${id}/actualizar`], {
      queryParams: { returnUrl: this.url }
    });
  }

  onFiltersChange(filters) {
    this.filters = filters;
    this.getData();
  }

  onDelete(id: string | number) {
    Helpers.setLoading(true);
    this.resourceService.delete(id).subscribe(
      () => {
        this.toastr.success("Recurso Eliminado");
        Helpers.setLoading(false);
        this.getData();
      },
      error => {
        this.toastr.error("Ha ocurrido un error al eliminar el recurso");
        Helpers.setLoading(false);
      }
    );
  }
  downloadXLS(name: string, data: any) {
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(data);
    link.download = name;
    link.click();
    Helpers.setLoading(false);
    this.selectedItems = [];
  }
}
