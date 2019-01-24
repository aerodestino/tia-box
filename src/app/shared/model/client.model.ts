import { Model } from "./model";

/**
 * The model that represents Client's data.
 */
export class Client extends Model {
    constructor(public nombre?: string,
        public email?: string,
        public id_cliente_plataforma?: string,
        public nickname?: string,
        public telefono?: string,
        public telefono_alternativo?: string,
        public sincronizar?: boolean,
        public status?: boolean, ) {
        super();
    }
}
