import { Model } from "./model";
import { Country } from "./country.model";

/**
 * The model that represents Coin's data.
 */
export class Coin extends Model {
    constructor(public pais_id?: number,
        public pais?: Country,
        public nombre?: string,
        public simbolo?: string,
        public status?: number) {
        super();
    }
}
