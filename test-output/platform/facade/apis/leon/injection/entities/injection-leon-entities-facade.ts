import { ApiTokenFacade } from "@leon/facade/apis/leon/entities/api-token-facade";

export class InjectionLeonEntitiesFacade {
    public static ApiTokenFacade() { return ApiTokenFacade.getInstance(); }
}


