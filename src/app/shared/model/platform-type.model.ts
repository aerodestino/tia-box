import { Model } from "./model";

/**
 * The model that represents Platform Type's data.
 */
export class PlatformType extends Model {
    constructor(public nombre?: string,
        public iniciales?: string,
        public status?: number,
        public is_marketplace?: number) {
        super();
    }
}
