import { Injectable } from "@angular/core";
import { EstadisticasService } from "./shared/services/api/estadisticas.service";

@Injectable()
export class AppService {
  notificaciones: any[] = [];
  notificacionesSinLeer: number = 0;
  categoriaSeleccionada: any;
  procesosEjecutandose: string[] = [];
  message: string;
  title: string;
  storagedItems: any[] = [];
  estadisticas: any;
  loadingMessage: string = "cargando";
  user: any;
  canShowSideNav = false;
  
  constructor(protected estadisticasService: EstadisticasService) {}

  getEstadisticas() {
    this.estadisticas = null;
    this.estadisticasService.list().subscribe(
      estadisticas => {
        this.estadisticas = estadisticas.json().data;
      },
      error => {}
    );
  }
  storageItem(item: string, value: any) {
    this.storagedItems[item] = value;
  }
  removeItem(item: string) {
    if (this.storagedItems[item]) this.storagedItems[item] = null;
  }
  getItem(item: string): any {
    return this.storagedItems[item];
  }
}
