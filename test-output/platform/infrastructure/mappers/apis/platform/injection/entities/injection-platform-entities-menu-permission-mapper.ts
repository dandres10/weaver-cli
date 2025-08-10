import { MenuPermissionDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/entities/menupermission/menu-permission-delete-mapper";
import { MenuPermissionEntityMapper } from "@platform/infrastructure/mappers/apis/platform/entities/menupermission/menu-permission-entity-mapper";
import { MenuPermissionReadMapper } from "@platform/infrastructure/mappers/apis/platform/entities/menupermission/menu-permission-read-mapper";
import { MenuPermissionSaveMapper } from "@platform/infrastructure/mappers/apis/platform/entities/menupermission/menu-permission-save-mapper";
import { MenuPermissionUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/entities/menupermission/menu-permission-update-mapper";

export class InjectionPlatformEntitiesMenuPermissionMapper {
  public static MenuPermissionEntityMapper(): MenuPermissionEntityMapper {
    return MenuPermissionEntityMapper.getInstance();
  }

  public static MenuPermissionSaveMapper(): MenuPermissionSaveMapper {
    return MenuPermissionSaveMapper.getInstance();
  }

  public static MenuPermissionReadMapper(): MenuPermissionReadMapper {
    return MenuPermissionReadMapper.getInstance();
  }

  public static MenuPermissionUpdateMapper(): MenuPermissionUpdateMapper {
    return MenuPermissionUpdateMapper.getInstance();
  }

  public static MenuPermissionDeleteMapper(): MenuPermissionDeleteMapper {
    return MenuPermissionDeleteMapper.getInstance();
  }
}