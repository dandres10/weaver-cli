import { LocationDeleteUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/location/location-delete-use-case";
import { LocationListUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/location/location-list-use-case";
import { LocationReadUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/location/location-read-use-case";
import { LocationSaveUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/location/location-save-use-case";
import { LocationUpdateUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/location/location-update-use-case";

export class InjectionPlatformEntitiesLocationUseCase {
  public static LocationReadUseCase(): LocationReadUseCase {
    return LocationReadUseCase.getInstance();
  }

  public static LocationSaveUseCase(): LocationSaveUseCase {
    return LocationSaveUseCase.getInstance();
  }

  public static LocationUpdateUseCase(): LocationUpdateUseCase {
    return LocationUpdateUseCase.getInstance();
  }

  public static LocationDeleteUseCase(): LocationDeleteUseCase {
    return LocationDeleteUseCase.getInstance();
  }

  public static LocationListUseCase(): LocationListUseCase {
    return LocationListUseCase.getInstance();
  }
}