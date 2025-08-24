import { AvailabilityRepository } from "../../business/availability/availability-repository";

export class InjectionPlatformBusinessRepository {
  public static AvailabilityRepository() { return AvailabilityRepository.getInstance(); }
}