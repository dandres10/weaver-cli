import { PlatformDeleteUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/platform/platform-delete-use-case";
import { PlatformListUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/platform/platform-list-use-case";
import { PlatformReadUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/platform/platform-read-use-case";
import { PlatformSaveUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/platform/platform-save-use-case";
import { PlatformUpdateUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/platform/platform-update-use-case";

export class InjectionPlatformEntitiesPlatformUseCase {
  public static PlatformReadUseCase(): PlatformReadUseCase {
    return PlatformReadUseCase.getInstance();
  }

  public static PlatformSaveUseCase(): PlatformSaveUseCase {
    return PlatformSaveUseCase.getInstance();
  }

  public static PlatformUpdateUseCase(): PlatformUpdateUseCase {
    return PlatformUpdateUseCase.getInstance();
  }

  public static PlatformDeleteUseCase(): PlatformDeleteUseCase {
    return PlatformDeleteUseCase.getInstance();
  }

  public static PlatformListUseCase(): PlatformListUseCase {
    return PlatformListUseCase.getInstance();
  }
}