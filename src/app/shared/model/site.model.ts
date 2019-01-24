import { Model } from "./model";

/**
 * The model that represents Site's data.
 */
export class Site extends Model {
    constructor(public nombre?: string,
        public iniciales?: string,
        public tipo_sitio?: number,
        public status?: number) {
        super();
    }
}
