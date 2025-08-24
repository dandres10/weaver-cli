import { AvailabilityFacade } from "@appointment/facade/apis/appointment/business/availability-facade";

export class InjectionPlatformBusinessFacade {
    public static AvailabilityFacade() { return AvailabilityFacade.getInstance(); }
}