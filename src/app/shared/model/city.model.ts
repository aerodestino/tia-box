import { Model } from "./model";
import { Country } from "./country.model";
import { Province } from "./province.model";
import { Zone } from "./zone.model";

/**
 * The model that represents City's data.
 */
export class City extends Model {
    constructor(public nombre?: string,
        public iniciales?: string,
        public provincia_id?: number,
        public provincia?: Province,
        public pais_id?: number,
        public pais?: Country,
        public zona_id?: number,
        public zona?: Zone,
        public status?: number,
        public ciudad_principal?: City,
        public parroquia?: boolean) {
        super();
        this.pais = pais || new Country();
        this.provincia = provincia || new Province();
        this.zona = zona || new Zone();
    }
}
