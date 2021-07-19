import { Model } from "./model";
import { User } from "./user.model";
import { Country } from "./country.model";
import { Extra } from "./extra.model";

/**
* The model that represents Articulo's data.
*/
export class Declaracion extends Model {
    constructor(
        public fecha_expiracion?: any,
        public remitente_id?: number,
        public remitente_extra_id?: number,
        public pais_origen_id?: number,
        public pais_destino_id?: number,
        public remitente?: any,
        public remitente_extra?: Extra,
        public pais_origen?: Country,
        public pais_destino?: Country,
        public numero_envios?: number,
        public descripcion?: string,
        public peso?: number,
        public cantidad?: number,
        public valor?: number,
        public total?: number,
        public importer?: any,
        public importer_extra?: Extra,
        public awb?: string,
        public articulo_id?: number,
        public descripciones?: any[],
        public remitente_text?: any
       
    ) {
        super();
    }
}
