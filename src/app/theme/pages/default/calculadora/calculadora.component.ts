import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Tarifario } from "../../../../shared/model/tarifario.model";
import { TarifariosService } from "../../../../shared/services/api/tarifarios.service";
import { PaisesService } from "../../../../shared/services/api/paises.service";
import { ZonasService } from "../../../../shared/services/api/zonas.service";
import { Country } from "../../../../shared/model/country.model";
import { Zone } from "../../../../shared/model/zone.model";
import { CalculadoraService } from "../../../../shared/services/api/calculadora.service";
import { AppService } from "../../../../app.service";
import { Helpers } from "../../../../helpers";
import { ToastsManager } from "ng2-toastr";
import {Arancel} from "../../../../shared/model/arancel.model";
import {ArancelesService} from "../../../../shared/services/api/aranceles.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: './calculadora.component.html',
    styles: []
})
export class CalculadoraComponent implements OnInit {
    ci: any;
    cp: any;
    resultado: any[];

    tarifarios: Tarifario[] = [];
    aranceles: Arancel[] = [];
    tpeso: number;
    tdimension: number;
    constructor(public tarifariosService: TarifariosService, public arancelesService: ArancelesService,
                public calculadoraService: CalculadoraService, public ngbModal: NgbModal,
                public toastr: ToastsManager,
                public vcr: ViewContainerRef,
                public appService: AppService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.getTarifarios();
        this.getAranceles();
        this.tpeso = 0;
        this.tdimension= 1;
    }

    getTarifarios() {
        this.tarifarios = null;
        this.tarifariosService.getAll({pais_id: this.appService.user.pais.id,web:true}).subscribe(tarifarios => {
            this.tarifarios = tarifarios.json().data;
        });
    }

    getAranceles() {
        this.aranceles = null;
        this.arancelesService.getAll({pais_id: this.appService.user.pais.id,web:true}).subscribe(aranceles => {
            this.aranceles = aranceles.json().data;
        });
    }

    calcular(variables: any, modal) {
        variables.factura = 1;
        variables.usuario_id = this.appService.user.id;
        this.appService.loadingMessage = "Realizando calculos...";
        Helpers.setLoading(true);
        this.calculadoraService.create(variables).subscribe(resultados => {
            Helpers.setLoading(false);
            this.resultado = resultados.json().data;
            this.appService.loadingMessage = "Cargando";
            this.ngbModal.open(modal);
            console.log(resultados.json().data);
        }, error => {
            this.appService.loadingMessage = "Cargando";
            Helpers.setLoading(false);
             this.toastr.error('Ocurrió un error');
            console.log(this.toastr.error(error.json().error.message));
           // this.toastr.error(error.json().error.message);
        });
    }

}
