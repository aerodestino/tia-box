import { Model } from "./model";
import { Coin } from "./coin.model";
import { Provider } from "./provider.model";
import { Site } from "./site.model";

/**
 * The model that represents Purchase's data.
 */
export class Purchase extends Model {
    id: number;
    constructor(public fecha_compra?: Date,
        public order_compra?: string,
        public subtotal?: number,
        public impuestos_envio?: number,
        public impuestos?: number,
        public descuento?: number,
        public total?: number,
        public total_items?: number,
        public moneda_id?: number,
        public moneda?: Coin,
        public proveedor_id?: number,
        public proveedor?: Provider,
        public sitio_id?: number,
        public sitio?: Site,
        public status?: number,
        public verificado?: number,
    ) {
        super();
    }
}
