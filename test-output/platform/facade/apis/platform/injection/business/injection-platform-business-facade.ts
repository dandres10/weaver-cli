import { AuthFacade } from "@platform/facade/apis/platform/business/auth-facade";

export class InjectionPlatformBusinessFacade {
  private static instance: InjectionPlatformBusinessFacade;

  public static getInstance(): InjectionPlatformBusinessFacade {
    if (!InjectionPlatformBusinessFacade.instance)
      InjectionPlatformBusinessFacade.instance = new InjectionPlatformBusinessFacade();
    return InjectionPlatformBusinessFacade.instance;
  }

  public static AuthFacade(): AuthFacade {
    return AuthFacade.getInstance();
  }
}