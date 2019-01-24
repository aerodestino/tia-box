import { Model } from './model';
import { Country } from "./country.model";

/**
 * The model that represents Zone's data.
 */
export class Zone extends Model {
    constructor(public nombre?: string,
        public domicilio?: number,
        public iva?: number,
        public pais_id?: number,
        public pais?: Country,
        public status?: boolean) {
        super();
    }
}
