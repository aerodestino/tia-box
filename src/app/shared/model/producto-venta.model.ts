import { Model } from "./model";
import { Platform } from "./platform.model";
import { Gateway } from "./gateway.model";
import { Client } from "./client.model";
import { Coin } from "./coin.model";
import { Envio } from "./envio.model";

/**
 * The model that represents Order's data.
 */
export class ProductoVenta extends Model {
    constructor(public producto_id?: number | string,
        public cantidad_productos?: number,
        public cliente?: Client,
        public precio?: number,
    ) {
        super();
    }
}
