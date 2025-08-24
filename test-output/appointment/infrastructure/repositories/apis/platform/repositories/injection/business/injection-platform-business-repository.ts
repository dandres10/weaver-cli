import { AuthRepository } from "../../business/auth/auth-repository";

export class InjectionPlatformBusinessRepository {
  public static AuthRepository() { return AuthRepository.getInstance(); }
}