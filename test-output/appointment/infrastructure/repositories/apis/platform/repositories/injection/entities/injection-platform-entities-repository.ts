import { LocationRepository } from "../../entities/location/location-repository";

export class InjectionPlatformEntitiesRepository {
  public static LocationRepository() { return LocationRepository.getInstance(); }
}


