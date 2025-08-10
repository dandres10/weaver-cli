import { LocationDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/entities/location/location-delete-mapper";
import { LocationEntityMapper } from "@platform/infrastructure/mappers/apis/platform/entities/location/location-entity-mapper";
import { LocationReadMapper } from "@platform/infrastructure/mappers/apis/platform/entities/location/location-read-mapper";
import { LocationSaveMapper } from "@platform/infrastructure/mappers/apis/platform/entities/location/location-save-mapper";
import { LocationUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/entities/location/location-update-mapper";

export class InjectionPlatformEntitiesLocationMapper {
  public static LocationEntityMapper(): LocationEntityMapper {
    return LocationEntityMapper.getInstance();
  }

  public static LocationSaveMapper(): LocationSaveMapper {
    return LocationSaveMapper.getInstance();
  }

  public static LocationReadMapper(): LocationReadMapper {
    return LocationReadMapper.getInstance();
  }

  public static LocationUpdateMapper(): LocationUpdateMapper {
    return LocationUpdateMapper.getInstance();
  }

  public static LocationDeleteMapper(): LocationDeleteMapper {
    return LocationDeleteMapper.getInstance();
  }
}