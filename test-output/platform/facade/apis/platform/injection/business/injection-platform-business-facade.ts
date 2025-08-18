import { AuthFacade } from "@platform/facade/apis/platform/business/auth-facade";

export class InjectionPlatformBusinessFacade {
    public static AuthFacade() { return AuthFacade.getInstance(); }
}