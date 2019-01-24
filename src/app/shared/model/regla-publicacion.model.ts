import { Model } from "./model";

/**
 * The model that represents Regla de publicacion's data.
 */
export class ReglaPublicacion extends Model {
    id: number;
    constructor(public nombre?: string,
        public atributo?: string,
        public valor?: string,
        public operador?: string,
        public tipo?: string,
    ) {
        super();
    }
}
