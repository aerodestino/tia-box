import { Model } from "./model";
import { Country } from "./country.model";
import { Skumaster } from "./skumaster.model";

/**
 * The model that represents Site's data.
 */
export class StockLocal extends Model {
    constructor(public precio?: number,
        public cantidad?: number,
        public pais_id?: number,
        public pais?: Country,
        public skumaster?: Skumaster) {
        super();
    }
}
