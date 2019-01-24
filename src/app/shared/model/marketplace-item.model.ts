import { Model } from "./model";
import { Category } from "./category.model";

/**
 * The model that represents Marketplace Item's data.
 */
export class MarketplaceItem extends Model {
    id: string;
    constructor(public sku?: string,
        public titulo?: string,
        public caracteristicas?: string,
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
        public categoria_id?: number,
        public small_image?: any,
        public large_image?: any,
        public medium_image?: any,
        public thumbnail?: any,
        public variaciones?: any[],
        public media?: any[],

    ) {
        super();
    }
}
