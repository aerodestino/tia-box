import { Model } from "./model";
import { Category } from "./category.model";
import { Skumaster } from "./skumaster.model";

/**
 * The model that represents Products's data.
 */
export class Product extends Model {
    id: number;
    constructor(public sku_master?: Skumaster,
        public titulo?: string,
        public caracteristicas?: string,
        public bulletpoints?: string,
        public marca?: string,
        public dimensiones?: string,
        public video?: string,
        public peso?: number,
        public cantidad?: number,
        public precio?: number,
        public status?: number,
        public entrega_inmediata?: number,
        public smallimage_id?: number,
        public mediumimage_id?: number,
        public largeimage_id?: number,
        public categoria?: Category,
        public categoria_id?: number,
        public thumbnail_id?: number,
        public small_image?: any,
        public large_image?: any,
        public medium_image?: any,
        public thumbnail?: any,
    ) {
        super();
    }
}
