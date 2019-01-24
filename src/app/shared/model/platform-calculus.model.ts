import { Model } from "./model";
import { Category } from "./category.model";
import { Platform } from "./platform.model";

/**
 * The model that represents platform Calculus's data.
 */
export class PlatformCalculus extends Model {
    constructor(public categoria_id?: number,
        public categoria?: Category,
        public origen_id?: number,
        public skus?: any[],
        public ganancia?: number,
        public ganancia_minima?: number,
        public conversion?: number,
        public porcentaje_categoria?: number,
        public costo_guia_nacional?: number,
        public plataforma_id?: number,
        public plataforma?: Platform,
        public status?: number,
    ) {
        super();
    }
}
