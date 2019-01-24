import { Model } from "./model";
import { Role } from "./role.model";
import { Site } from "./site.model";

/**
 * The model that represents User's data.
 */
export class User extends Model {
    id: number;
    constructor(public nombre?: string,
        public email?: string,
        public role_id?: number,
        public role?: Role,
        public sitio?: Site,
        public sitio_id?: number | string,
        public status?: number) {
        super();
    }
}
