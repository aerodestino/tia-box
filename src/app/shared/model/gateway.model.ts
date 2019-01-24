import { Model } from "./model";
import { PlatformType } from "./platform-type.model";

/**
 * The model that represents Gateway's data.
 */
export class Gateway extends Model {
    id: number;
    constructor(public tipo_id?: number,
        public tipo?: PlatformType,
        public mp_access_token?: string,
        public public_key?: string,
        public status?: number,
        public nombre?: string,
        public iniciales?: string
    ) {
        super();
    }
}
