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
    costo: any[];

    tarifarios: Tarifario[] = [];
    aranceles: Arancel[] = [];
    tpeso: number;
    tdimension: number;
    usa_iva: boolean = true;
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
        // Create a copy of form data to avoid modifying the original
        const formData = {
            ...variables,
            factura: 1,
            usuario_id: this.appService.user.id
        };
        
        this.appService.loadingMessage = "Realizando calculos...";
        Helpers.setLoading(true);
        
        this.calculadoraService.create(formData).subscribe(resultados => {
            Helpers.setLoading(false);
            this.costo = resultados.json().data;
            this.appService.loadingMessage = "Cargando";
            this.ngbModal.open(modal);
            console.log(resultados.json().data);
        }, error => {
            this.appService.loadingMessage = "Cargando";
            Helpers.setLoading(false);
            
            // Better error handling that doesn't affect form values
            try {
                const errorMessage = error.json().error.message;
                this.toastr.error(errorMessage);
            } catch (e) {
                this.toastr.error('Ocurrió un error al realizar el cálculo');
            }
            
            console.error('Error en cálculo:', error);
        });
    }

}
