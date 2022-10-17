import { City } from "./city.model";
import { Country } from "./country.model";
import { Model } from "./model";
import { Province } from "./province.model";
import { Role } from "./role.model";
import { Site } from "./site.model";

/**
 * The model that represents User's data.
 */
export class User extends Model {
    id: number;
    constructor(public nombre?: string,
        public email?: string,
        public role_id?: number,
        public numero_identidad?: any,
        public role?: Role,
        public sitio?: Site,
        public sitio_id?: number | string,
        public direccion?: string,
        public celular?: string,
        public codigo?: string,
        public apellido?: string,
        public empresa?: string,
        public buscar?: string,
        public buscar1?: string,
        public buscar2?: string,
        public codigo_postal?: string,
        public ciudad_id?: any,
        public pais_id?: any,
        public provincia_id?: any,
        public cedula?: string,
        public parroquia?: City,
        public parroquia_id?: any,
        public ciudad?: City,
        public provincia?: Province,
        public pais?: Country,
        public status?: number) {
        super();
    }
}
