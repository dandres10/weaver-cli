import { ApiTokenFacade } from "@platform/facade/apis/platform/entities/api-token-facade";

export class InjectionPlatformEntitiesFacade {
    public static ApiTokenFacade() { return ApiTokenFacade.getInstance(); }
}


