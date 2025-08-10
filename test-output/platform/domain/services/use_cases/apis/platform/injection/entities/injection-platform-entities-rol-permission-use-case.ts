import { RolPermissionDeleteUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/rolpermission/rol-permission-delete-use-case";
import { RolPermissionListUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/rolpermission/rol-permission-list-use-case";
import { RolPermissionReadUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/rolpermission/rol-permission-read-use-case";
import { RolPermissionSaveUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/rolpermission/rol-permission-save-use-case";
import { RolPermissionUpdateUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/rolpermission/rol-permission-update-use-case";

export class InjectionPlatformEntitiesRolPermissionUseCase {
  public static RolPermissionReadUseCase(): RolPermissionReadUseCase {
    return RolPermissionReadUseCase.getInstance();
  }

  public static RolPermissionSaveUseCase(): RolPermissionSaveUseCase {
    return RolPermissionSaveUseCase.getInstance();
  }

  public static RolPermissionUpdateUseCase(): RolPermissionUpdateUseCase {
    return RolPermissionUpdateUseCase.getInstance();
  }

  public static RolPermissionDeleteUseCase(): RolPermissionDeleteUseCase {
    return RolPermissionDeleteUseCase.getInstance();
  }

  public static RolPermissionListUseCase(): RolPermissionListUseCase {
    return RolPermissionListUseCase.getInstance();
  }
}