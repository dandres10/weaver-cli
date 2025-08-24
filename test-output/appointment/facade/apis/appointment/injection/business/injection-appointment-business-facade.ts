import { AvailabilityFacade } from "@appointment/facade/apis/appointment/business/availability-facade";

export class InjectionAppointmentBusinessFacade {
    public static AvailabilityFacade() { return AvailabilityFacade.getInstance(); }
}