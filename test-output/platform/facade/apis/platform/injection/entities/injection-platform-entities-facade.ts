import { ApiTokenFacade } from "@platform/facade/apis/platform/entities/api-token-facade";
import { PlatformFacade } from "@platform/facade/apis/platform/entities/platform-facade";

export class InjectionPlatformEntitiesFacade {
    public static ApiTokenFacade() { return ApiTokenFacade.getInstance(); }
    public static PlatformFacade() { return PlatformFacade.getInstance(); }
}


