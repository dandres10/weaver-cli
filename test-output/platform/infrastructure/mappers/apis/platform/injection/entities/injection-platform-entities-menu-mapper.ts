import { MenuDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/entities/menu/menu-delete-mapper";
import { MenuEntityMapper } from "@platform/infrastructure/mappers/apis/platform/entities/menu/menu-entity-mapper";
import { MenuReadMapper } from "@platform/infrastructure/mappers/apis/platform/entities/menu/menu-read-mapper";
import { MenuSaveMapper } from "@platform/infrastructure/mappers/apis/platform/entities/menu/menu-save-mapper";
import { MenuUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/entities/menu/menu-update-mapper";

export class InjectionPlatformEntitiesMenuMapper {
  public static MenuEntityMapper(): MenuEntityMapper {
    return MenuEntityMapper.getInstance();
  }

  public static MenuSaveMapper(): MenuSaveMapper {
    return MenuSaveMapper.getInstance();
  }

  public static MenuReadMapper(): MenuReadMapper {
    return MenuReadMapper.getInstance();
  }

  public static MenuUpdateMapper(): MenuUpdateMapper {
    return MenuUpdateMapper.getInstance();
  }

  public static MenuDeleteMapper(): MenuDeleteMapper {
    return MenuDeleteMapper.getInstance();
  }
}