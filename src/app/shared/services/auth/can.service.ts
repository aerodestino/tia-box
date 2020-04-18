import { Injectable } from "@angular/core";
import { UsuariosService } from "../api/usuarios.service";

enum PermissionType {
  VIEW = 1,
  CREATE = 2,
  EDIT = 4,
  DELETE = 8
}

interface EntityPermission {
  entity?: boolean;
  [id: string]: boolean;
}

interface Permission {
  [entity: string]: EntityPermission;
}

export interface UserPermissions {
  [label: string]: {
    permissions?: number;
    objects?: {
      [id: string]: number;
    };
  };
}

function entities(): Permission {
  return {
    arancel: {},
    articulo: {},
    courier: {},
    envio: {},
    extra: {},
    facturacion: {},
    faq: {},
    interfaz: {},
    mail: {},
    pais: {},
    role: {},
    sitio: {},
    tarifario: {},
    usuario: {}
  };
}

@Injectable()
export class CanService {
  gettingPermissions = false;
  permissionsGot = false;
  view: Permission = entities();
  edit: Permission = entities();
  create: Permission = entities();
  delete: Permission = entities();

  constructor(private user: UsuariosService) {
    this.getPermissions();
  }

  getPermissions() {
    if (!this.permissionsGot && !this.gettingPermissions) {
      this.gettingPermissions = true;
      this.user.getPermissions().subscribe(
        response => {
          this.gettingPermissions = false;
          this.permissionsGot = true;
          const { permissions, isSuper } = response.json().data;
          this.buildAuthorization(permissions, isSuper);
        },
        error => {
          this.gettingPermissions = false;
          console.log({ error });
        }
      );
    }
  }

  private buildAuthorization(permissions: UserPermissions, isSuper: boolean) {
    Object.keys(entities()).forEach(entityName => {
      const entity = permissions[entityName] || {
        permissions: 0
      };

      this.view[entityName].entity = this.check(
        PermissionType.VIEW,
        entity.permissions,
        isSuper
      );
      this.create[entityName].entity = this.check(
        PermissionType.CREATE,
        entity.permissions,
        isSuper
      );
      this.edit[entityName].entity = this.check(
        PermissionType.EDIT,
        entity.permissions,
        isSuper
      );
      this.delete[entityName].entity = this.check(
        PermissionType.DELETE,
        entity.permissions,
        isSuper
      );

      const objects = entity.objects;
      if (objects) {
        Object.keys(objects).forEach(id => {
          this.view[entityName][id] = this.check(
            PermissionType.VIEW,
            objects[id],
            isSuper
          );
          this.create[entityName][id] = this.check(
            PermissionType.CREATE,
            objects[id],
            isSuper
          );
          this.edit[entityName][id] = this.check(
            PermissionType.EDIT,
            objects[id],
            isSuper
          );
          this.delete[entityName][id] = this.check(
            PermissionType.DELETE,
            objects[id],
            isSuper
          );
        });
      }
    });
  }

  private check(
    permissionType: PermissionType,
    permissions: number,
    isSuper: boolean
  ) {
    return isSuper || Boolean(permissionType & permissions);
  }
}
