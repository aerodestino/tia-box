import { Model } from "./model";
import { User } from "./user.model";
import { Arancel } from "./arancel.model";
import { Tarifario } from "./tarifario.model";
import {Extra} from "./extra.model";
import {Country} from "./country.model";
import { Declaracion } from "./declaracion.model";
/**
* The model that represents Articulo's data.
*/
export class Articulo extends Model {
    constructor(
        public trackbox?: string,
        public usuario_id?: number,
        public extra_id?: number,
        public usuario?: User,
        public extra?: Extra,
        public descripcion?: string,
        public tienda?: string,
        public tracking?: string,
        public transporte?: string,
        public tipo_paquete?: string,
        public piezas?: number,
        public factura?: number,
        public fecha_bodega?: any,
        public arancel_id?: number,
        public arancel?: Arancel,
        public tarifario_id?: number,
        public tarifario?: Tarifario,
        public precio?: number,
        public peso?: number,
        public alto?: number,
        public ancho?: number,
        public largo?: number,
        public volumen?: number,
        public cargos_extra?: number,
        public precio_final?: number,
        public estado_articulo?: any,
        public tipopeso?: number,
        public tipodimension?: number,
        public remitente?: string,
        public usuario_carrier?: any,
        public extra_carrier?: any,
        public pais_origen_d_v?: Country,
        public pais_destino_d_v?: Country,
        public fecha_expiracion_d_v?: any,
        public descripciones_d_v?: Declaracion[],
        public extra_carrier_d_v?: Extra,
        public extra_importer_d_v?: Extra,
        public usuario_carrier_d_v?: User,
        public usuario_importer_d_v?: User,
        public consolidado_factura?: boolean,
        public consolidado?: boolean,
        public tipo?: boolean,
        public unidades?: number,
        public fac_d_v?: boolean,
        public descripcion_embarque?: any,
        public nota?: any,
        public tienda_embarque?: any,
    ) {
        super();
    }
}
