import { Model } from "./model";
import { User } from "./user.model";
import { Tarifario } from "./tarifario.model";
import { Arancel } from "./arancel.model";
import { Courier } from "./courier.model";

/**
 * The model that represents Extra's data.
 */
export class Extra extends Model {
    constructor(
        public usuario_id?: number,
        public usuario?: User,
        public nombre?: string,
        public apellidos?: string,
        public direccion?: string,
        public identificacion?: string,
        public celular?: string
    ) {
        super();
    }
}
