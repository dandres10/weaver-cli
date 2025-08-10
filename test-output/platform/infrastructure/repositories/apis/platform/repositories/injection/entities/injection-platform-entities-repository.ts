import { CompanyRepository } from "../../entities/company/company-repository";

export class InjectionPlatformEntitiesRepository {
  public static CompanyRepository() { return CompanyRepository.getInstance(); }
}


