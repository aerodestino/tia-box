import { Model } from "./model";

/**
 * The model that represents Country's data.
 */
export class Country extends Model {
    id: number;
    constructor(public nombre?: string,
        public abreviatura?: string,
        public status?: number) {
        super();
    }
}
