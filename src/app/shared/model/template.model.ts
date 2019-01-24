import { Model } from "./model";
import { Platform } from "./platform.model";

/**
 * The model that represents Template's data.
 */
export class Template extends Model {
    constructor(public nombre?: string,
        public iniciales?: string,
        public plantilla?: string,
        public plataforma?: Platform,
        public plataforma_id?: string | number,
        public status?: number) {
        super();
    }
}
