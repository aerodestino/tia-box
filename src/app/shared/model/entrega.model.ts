import { Model } from "./model";
import { City } from "./city.model";
import { Province } from "./province.model";
import { User } from "./user.model";
import { Extra } from "./extra.model";

/**
* The model that represents Facturacion's data.
*/
export class Entrega extends Model {
    constructor(
        public ciudad?: City,
        public ciudad_id?: number,
        public usuario?: User,
        public extra?: Extra,
        public ciudadRetiro?: City,
        public ciudad_retiro?: City,
        public articulos?: number[],
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
        public codigoPostal?: string
    ) {
        super();
    }
}
