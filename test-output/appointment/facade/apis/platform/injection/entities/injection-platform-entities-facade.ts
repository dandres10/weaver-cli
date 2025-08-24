import { LocationFacade } from "@platform/facade/apis/platform/entities/location-facade";

export class InjectionPlatformEntitiesFacade {
    public static LocationFacade() { return LocationFacade.getInstance(); }
}


