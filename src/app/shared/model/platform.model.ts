import { Model } from "./model";
import { Country } from "./country.model";
import { PlatformType } from "./platform-type.model";

/**
 * The model that represents Platform's data.
 */
export class Platform extends Model {
    constructor(public nombre?: string,
        public is_default?: number,
        public tipo_plataforma_id?: number,
        public tipoPlataforma?: PlatformType,
        public pais_id?: number,
        public pais?: Country,
        public status?: number,
        public seller_id?: string,
        public market_place?: string,
        public merchant_id?: string,
        public user_id?: string,
        public api_key?: string,
        public redirect_uri?: string,
        public app_id?: string,
        public secret?: string,
    ) {
        super();
    }
}
