import { Model } from "./model";
import { Category } from "./category.model";

/**
 * The model that represents Skumaster's data.
 */
export class Skumaster extends Model {
    id: string;
    constructor(public skuMaster?: string,
        public titulo?: string,
        public extraBullets?: string,
        public dimensionesPackage?: string,
        public pesoPackage?: string,
        public padre?: string,
        public caracteristicas?: string,
        public categoriaNombre?: string,
        public bulletpoints?: string,
        public marca?: string,
        public dimensiones?: string,
        public video?: string,
        public peso?: number,
        public cantidad?: number,
        public precio?: number,
        public flujo_item?: string,
        public status?: number,
        public entrega_inmediata?: number,
        public categoria?: Category,
        public categoriaId?: number,
        public estado?: boolean,
        public medias?: any[],
        public variaciones?: any[]

    ) {
        super();
    }
}
