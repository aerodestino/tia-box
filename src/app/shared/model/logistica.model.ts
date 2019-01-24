import { Model } from "./model";
import { PlatformType } from "./platform-type.model";
import { Country } from "./country.model";
import { Courier } from "./courier.model";
import { Coin } from "./coin.model";

/**
 * The model that represents Logistica's data.
 */
export class Logistica extends Model {
    id: number;
    constructor(public tracking_id?: string,
        public costo_envio_usa?: number,
        public fecha_llegada?: any,
        public consolidado?: boolean,
        public costo_importacion?: number,
        public pais_id?: number,
        public empresa_envio_id?: string | number,
        public pais?: Country,
        public empresa_envio?: Courier,
        public moneda_id?: string | number,
        public moneda?: Coin,
        public status?: boolean,

    ) {
        super();
    }
}
