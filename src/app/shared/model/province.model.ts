import { Model } from "./model";
import { Country } from "./country.model";
import { Zone } from "./zone.model";

/**
 * The model that represents Province's data.
 */
export class Province extends Model {
    constructor(public nombre?: string,
        public iniciales?: string,
        public pais_id?: number,
        public pais?: Country,
        public zona_id?: number,
        public zona?: Zone,
        public status?: number) {
        super();
    }
}
