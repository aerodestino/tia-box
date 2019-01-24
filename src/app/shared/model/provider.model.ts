import { Model } from "./model";
import { Site } from "./site.model";

/**
 * The model that represents Provider's data.
 */
export class Provider extends Model {
    id: number;

    constructor(public nombre?: string,
        public iniciales?: string,
        public sitio?: Site,
        public sitio_id?: number,
        public status?: number) {
        super();
    }
}
