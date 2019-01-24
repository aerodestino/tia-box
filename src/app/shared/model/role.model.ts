import { Model } from "./model";

/**
 * The model that represents Role's data.
 */
export class Role extends Model {
    id: number;
    constructor(public name?: string,
        public display_name?: string,
        public status?: number) {
        super();
    }
}
