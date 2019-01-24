import { Model } from "./model";

/**
 * The model that represents Template's data.
 */
export class Track extends Model {
    constructor(public codigo?: string,
                public empresa_transporte?: string,
                public fecha_posible?: string,
                public fecha_ingreso?: string,
                ) {
        super();
    }
}
