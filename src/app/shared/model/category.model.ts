import { Model } from "./model";

/**
 * The model that represents Category's data.
 */
export class Category extends Model {
    id: number;
    constructor(public nombre?: string,
        public iniciales?: string,
        public singular?: string,
        public padre_id?: number,
        public padre?: Category,
        public status?: number,
        public sub_categorias?: Category[]) {
        super();
    }
}
