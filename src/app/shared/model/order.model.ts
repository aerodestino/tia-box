import { Model } from "./model";
import { Platform } from "./platform.model";
import { Gateway } from "./gateway.model";
import { Client } from "./client.model";
import { Coin } from "./coin.model";
import { Envio } from "./envio.model";

/**
 * The model that represents Order's data.
 */
export class Order extends Model {
    constructor(public plataforma?: Platform,
        public plataforma_id?: number,
        public pasarela?: Gateway,
        public pasarela_id?: number,
        public cliente?: Client,
        public cliente_id?: number | string,
        public moneda?: Coin,
        public moneda_id?: number | string,
        public fecha_venta?: any,
        public no_orden?: string,
        public numero_cobro?: string,
        public reembolso?: number,
        public cargo_venta?: number,
        public productos?: any[],
        public envio?: Envio,
        public notas?: any[],
    ) {
        super();
    }
}
