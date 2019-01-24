import { Model } from "./model";
import { Country } from "./country.model";

/**
 * The model that represents Courier's data.
 */
export class Courier extends Model {
    constructor(public nombre?: string,
        public iniciales?: string,
        public pais_id?: number,
        public pais?: Country,
        public status?: number) {
        super();
    }
}
