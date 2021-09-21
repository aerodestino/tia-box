import { Model } from "./model";
import { City } from "./city.model";
import { Province } from "./province.model";
import { User } from "./user.model";
import { Extra } from "./extra.model";
import { Articulo } from "./articulo.model";

/**
* The model that represents Facturacion's data.
*/
export class Entrega extends Model {
    constructor(
        public ciudad?: City,
        public articulo?: Articulo[],
        public ciudad_id?: number,
        public usuario?: User,
        public extra?: Extra,
        public ciudadRetiro?: City,
        public ciudad_retiro?: any,
        public articulos?: any[],
        public fechIngreso?: any,
        public nombre?:string,
        public apellidos?:string,
        public cedula?:string,
        public celular?:string,
        public direccion?:string,
        public provincia?:Province,
        public provinciaRetiro?:Province,
        public nota_retiro?:any,
        public nota?:any,
        public notaRetiro?:any,
        public domicilio?:any,
        public codigoPostal?: string,
        public codigo_postal?: string,
        public ciudad_retiro_text?: string,
        public pais?:any,
        public pais_retiro?:any,
        public provincia_retiro?:any,
        public parroquia?: City,
        public parroquia_retiro?: City,
        public parroquia_id?: any
    ) {
        super();
    }
}
