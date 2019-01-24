import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import {User} from "../../../../../shared/model/user.model";
import {UsuariosService} from "../../../../../shared/services/api/usuarios.service";

@Component({
    selector: 'app-extra-filtros',
    templateUrl: './extras-filtros.component.html',
    styles: []
})
export class ExtraFiltrosComponent implements OnInit {
    public usuarios: User[];

    @Input() filters: any;
    @Output() filtersChange: EventEmitter<any> = new EventEmitter();
    constructor(
        private usuariosService: UsuariosService
    ) {
    }
    ngOnInit() {
        this.getUsuarios();
    }

    onChange() {
        this.filtersChange.emit(this.filters);
    }

    getUsuarios() {
        this.usuariosService.getAll().subscribe((data) => {
            this.usuarios = data.json().data;
        }, (error) => {
            console.log(error.json());
        });
    }
}
