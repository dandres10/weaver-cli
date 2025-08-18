import { AuthRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/business/auth/auth-repository";

export class InjectionPlatformBusinessRepository {
  private static instance: InjectionPlatformBusinessRepository;

  public static getInstance(): InjectionPlatformBusinessRepository {
    if (!InjectionPlatformBusinessRepository.instance)
      InjectionPlatformBusinessRepository.instance = new InjectionPlatformBusinessRepository();
    return InjectionPlatformBusinessRepository.instance;
  }

  public static AuthRepository(): AuthRepository {
    return AuthRepository.getInstance();
  }
}