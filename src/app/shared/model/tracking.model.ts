import { Model } from "./model";
import { Courier } from "./courier.model";

/**
 * The model that represents Tracking's data.
 */
export class Tracking extends Model {
    constructor(public nombre?: string,
        public fecha_llegada?: any,
        public empresa_envio_id?: number,
        public empresa_envio?: Courier,
        public status?: number) {
        super();
    }
}
