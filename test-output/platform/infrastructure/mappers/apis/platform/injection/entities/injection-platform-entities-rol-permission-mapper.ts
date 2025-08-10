import { RolPermissionDeleteMapper } from "@bus/infrastructure/mappers/apis/platform/entities/rolpermission/rol-permission-delete-mapper";
import { RolPermissionEntityMapper } from "@bus/infrastructure/mappers/apis/platform/entities/rolpermission/rol-permission-entity-mapper";
import { RolPermissionReadMapper } from "@bus/infrastructure/mappers/apis/platform/entities/rolpermission/rol-permission-read-mapper";
import { RolPermissionSaveMapper } from "@bus/infrastructure/mappers/apis/platform/entities/rolpermission/rol-permission-save-mapper";
import { RolPermissionUpdateMapper } from "@bus/infrastructure/mappers/apis/platform/entities/rolpermission/rol-permission-update-mapper";

export class InjectionPlatformEntitiesRolPermissionMapper {
  public static RolPermissionEntityMapper(): RolPermissionEntityMapper {
    return RolPermissionEntityMapper.getInstance();
  }

  public static RolPermissionSaveMapper(): RolPermissionSaveMapper {
    return RolPermissionSaveMapper.getInstance();
  }

  public static RolPermissionReadMapper(): RolPermissionReadMapper {
    return RolPermissionReadMapper.getInstance();
  }

  public static RolPermissionUpdateMapper(): RolPermissionUpdateMapper {
    return RolPermissionUpdateMapper.getInstance();
  }

  public static RolPermissionDeleteMapper(): RolPermissionDeleteMapper {
    return RolPermissionDeleteMapper.getInstance();
  }
}