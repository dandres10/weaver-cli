import { MenuDeleteUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/menu/menu-delete-use-case";
import { MenuListUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/menu/menu-list-use-case";
import { MenuReadUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/menu/menu-read-use-case";
import { MenuSaveUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/menu/menu-save-use-case";
import { MenuUpdateUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/menu/menu-update-use-case";

export class InjectionPlatformEntitiesMenuUseCase {
  public static MenuReadUseCase(): MenuReadUseCase {
    return MenuReadUseCase.getInstance();
  }

  public static MenuSaveUseCase(): MenuSaveUseCase {
    return MenuSaveUseCase.getInstance();
  }

  public static MenuUpdateUseCase(): MenuUpdateUseCase {
    return MenuUpdateUseCase.getInstance();
  }

  public static MenuDeleteUseCase(): MenuDeleteUseCase {
    return MenuDeleteUseCase.getInstance();
  }

  public static MenuListUseCase(): MenuListUseCase {
    return MenuListUseCase.getInstance();
  }
}