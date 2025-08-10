import { CountryRepository } from "../../entities/country";

export class InjectionPlatformEntitiesRepository {
  public static CountryRepository() { return CountryRepository.getInstance(); }
}


