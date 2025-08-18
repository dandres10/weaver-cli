import { CompanyRepository } from "../../business/company/company-repository";
import { AuthRepository } from "../../business/auth/auth-repository";

export class InjectionPlatformBusinessRepository {
  public static CompanyRepository() { return CompanyRepository.getInstance(); }
  public static AuthRepository() { return AuthRepository.getInstance(); }
}