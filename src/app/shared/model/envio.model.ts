import { Model } from "./model";
import { Courier } from "./courier.model";

/**
 * The model that represents Envio's data.
 */
export class Envio extends Model {
    id: number;
    constructor(public calle?: string,
        public codigo_postal?: string,
        public ciudad?: string,
        public costo_guia?: number,
        public empresa_envio_id?: number | string,
        public empresa_envio?: Courier,
        public colonia?: string,
        public numero_exterior?: string,
        public numero_interior?: string,
        public numero_guia?: string,
        public persona_recibe?: string,
        public referencia?: string,
        public telefono?: string) {
        super();
    }
}
