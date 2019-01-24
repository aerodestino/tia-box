import { Model } from './model';

/**
 * The model that represents Tarifario's data.
 */
export class TarifarioDetails extends Model {
    constructor(public peso_minimo?: number,
        public peso_maximo?: number,
        public peso_inicial?: number,
        public costo_base?: number,
        public costo_peso_adicional?: number,
        public costo_sobrepeso?: number,
        public tarifario_id?: string | number,
        public status?: boolean,
        public peso_volumen?: boolean,
    ) {
        super();
    }
}
