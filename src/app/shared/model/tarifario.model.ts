import { Model } from "./model";
import { Country } from "./country.model";

/**
 * The model that represents Tarifario's data.
 */
export class Tarifario extends Model {
    constructor(public pais_id?: number,
        public pais?: Country,
        public nombre?: string,
        public seguro?: number,
        public seguro_base?: number,
        public combustible?: number,
        public cubicacion?: number,
        public arancel?: number,
        public precio_cobra_iva?: number,
        public peso_cobra_iva?: number,
        public precio_cobra_arancel?: number,
        public peso_cobra_arancel?: number,
        public status?: boolean,
        public cant_unidades?: number,
        public impuestos?: boolean,
        public arancel_tarifario?: boolean,
        public iva?: boolean,
    ) {
        super();
    }
}
