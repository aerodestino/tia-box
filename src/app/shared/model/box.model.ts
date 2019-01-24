import { Model } from "./model";

/**
 * The model that represents Box's data.
 */
export class Box extends Model {
    constructor(public x?: number,
        public y?: number,
        public z?: number) {
        super();
    }
}
