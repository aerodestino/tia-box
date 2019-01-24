import { Model } from "./model";
import { Country } from "./country.model";
import { Site } from "./site.model";
import { Category } from "./category.model";

/**
 * The model that represents Arancel's data.
 */
export class Arancel extends Model {
    constructor(public porcentaje?: number,
        public codigo?: string,
        public descripcion?: string,
        public iva?: boolean,
        public ice?: string | number,
        public salvaguarda?: number,
        public pais_id?: number | string,
        public pais?: Country,
        public status?: boolean,
        public sitio_id?: number | string,
        public sitio?: Site,
        public categorias?: any[],
    ) {
        super();
    }
}
