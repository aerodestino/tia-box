import { Model } from "./model";
import { Gateway } from "./gateway.model";
import { Platform } from "./platform.model";

/**
 * The model that represents Unpaid Sale's data.
 */
export class UnpaidSale extends Model {
    constructor(public pasarela_id?: number,
        public pasarela?: Gateway,
        public plataforma_id?: number,
        public platform?: Platform,
        public fecha_inicio?: Date,
        public fecha_fin?: Date,
        public status?: number) {
        super();
    }
}
