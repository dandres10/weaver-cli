import { MenuPermissionDeleteUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/menupermission/menu-permission-delete-use-case";
import { MenuPermissionListUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/menupermission/menu-permission-list-use-case";
import { MenuPermissionReadUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/menupermission/menu-permission-read-use-case";
import { MenuPermissionSaveUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/menupermission/menu-permission-save-use-case";
import { MenuPermissionUpdateUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/menupermission/menu-permission-update-use-case";

export class InjectionPlatformEntitiesMenuPermissionUseCase {
  public static MenuPermissionReadUseCase(): MenuPermissionReadUseCase {
    return MenuPermissionReadUseCase.getInstance();
  }

  public static MenuPermissionSaveUseCase(): MenuPermissionSaveUseCase {
    return MenuPermissionSaveUseCase.getInstance();
  }

  public static MenuPermissionUpdateUseCase(): MenuPermissionUpdateUseCase {
    return MenuPermissionUpdateUseCase.getInstance();
  }

  public static MenuPermissionDeleteUseCase(): MenuPermissionDeleteUseCase {
    return MenuPermissionDeleteUseCase.getInstance();
  }

  public static MenuPermissionListUseCase(): MenuPermissionListUseCase {
    return MenuPermissionListUseCase.getInstance();
  }
}