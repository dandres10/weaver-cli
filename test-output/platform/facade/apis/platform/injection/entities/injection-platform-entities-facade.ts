import { ApiTokenFacade } from "@platform/facade/apis/platform/entities/api-token-facade";
import { PlatformFacade } from "@platform/facade/apis/platform/entities/platform-facade";
import { LocationFacade } from "@platform/facade/apis/platform/entities/location-facade";

export class InjectionPlatformEntitiesFacade {
    public static ApiTokenFacade() { return ApiTokenFacade.getInstance(); }
    public static PlatformFacade() { return PlatformFacade.getInstance(); }
    public static LocationFacade() { return LocationFacade.getInstance(); }
}


