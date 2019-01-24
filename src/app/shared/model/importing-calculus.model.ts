import { Model } from "./model";
import { Country } from "./country.model";
import { Province } from "./province.model";
import { City } from "./city.model";
import { Tarifario } from "./tarifario.model";
import { Category } from "./category.model";
import { Coin } from "./coin.model";
import { Zone } from "./zone.model";

/**
 * The model that represents Importing Calculus's data.
 */
export class ImportingCalculus extends Model {
    constructor(public pais_id?: number,
        public pais?: Country,
        public provincia_id?: number,
        public provincia?: Province,
        public ciudad_id?: number,
        public ciudad?: City,
        public zona_id?: number,
        public zona?: Zone,
        public tarifario_id?: number,
        public tarifario?: Tarifario,
        public categoria_id?: number,
        public categoria?: Category,
        public moneda_id?: number,
        public moneda?: Coin,
        public origen_id?: number,
        public skus?: string,
        public skusArray?: string[],
        public retiro_oficina?: boolean,
        public status?: number,
    ) {
        super();
    }
}
