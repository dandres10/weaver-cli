import { PlatformDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/entities/platform/platform-delete-mapper";
import { PlatformEntityMapper } from "@platform/infrastructure/mappers/apis/platform/entities/platform/platform-entity-mapper";
import { PlatformReadMapper } from "@platform/infrastructure/mappers/apis/platform/entities/platform/platform-read-mapper";
import { PlatformSaveMapper } from "@platform/infrastructure/mappers/apis/platform/entities/platform/platform-save-mapper";
import { PlatformUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/entities/platform/platform-update-mapper";

export class InjectionPlatformEntitiesPlatformMapper {
  public static PlatformEntityMapper(): PlatformEntityMapper {
    return PlatformEntityMapper.getInstance();
  }

  public static PlatformSaveMapper(): PlatformSaveMapper {
    return PlatformSaveMapper.getInstance();
  }

  public static PlatformReadMapper(): PlatformReadMapper {
    return PlatformReadMapper.getInstance();
  }

  public static PlatformUpdateMapper(): PlatformUpdateMapper {
    return PlatformUpdateMapper.getInstance();
  }

  public static PlatformDeleteMapper(): PlatformDeleteMapper {
    return PlatformDeleteMapper.getInstance();
  }
}