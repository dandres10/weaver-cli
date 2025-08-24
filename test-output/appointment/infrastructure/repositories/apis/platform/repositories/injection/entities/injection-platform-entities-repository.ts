import { LanguageRepository } from "../../entities/language/language-repository";

export class InjectionPlatformEntitiesRepository {
  public static LanguageRepository() { return LanguageRepository.getInstance(); }
}


