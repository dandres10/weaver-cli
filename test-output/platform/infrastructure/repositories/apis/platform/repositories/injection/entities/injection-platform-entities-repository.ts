import { ApiTokenRepository } from "../../entities/apitoken/api-token-repository";
import { PlatformRepository } from "../../entities/platform/platform-repository";
import { LocationRepository } from "../../entities/location/location-repository";

export class InjectionPlatformEntitiesRepository {
  public static ApiTokenRepository() { return ApiTokenRepository.getInstance(); }
  public static PlatformRepository() { return PlatformRepository.getInstance(); }
  public static LocationRepository() { return LocationRepository.getInstance(); }
}


