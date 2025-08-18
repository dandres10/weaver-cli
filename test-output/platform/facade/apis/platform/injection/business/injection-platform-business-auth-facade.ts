import { AuthFacade } from "@platform/facade/apis/platform/business/auth-facade";

export class InjectionPlatformBusinessAuthFacade {
  public static AuthFacade(): AuthFacade {
    return AuthFacade.getInstance();
  }
}