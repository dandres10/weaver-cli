import { AvailabilityRepository } from "../../business/availability/availability-repository";

export class InjectionAppointmentBusinessRepository {
  public static AvailabilityRepository() { return AvailabilityRepository.getInstance(); }
}