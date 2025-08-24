import { LanguageDeleteUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/language/language-delete-use-case";
import { LanguageListUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/language/language-list-use-case";
import { LanguageReadUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/language/language-read-use-case";
import { LanguageSaveUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/language/language-save-use-case";
import { LanguageUpdateUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/language/language-update-use-case";

export class InjectionPlatformEntitiesLanguageUseCase {
  public static LanguageReadUseCase(): LanguageReadUseCase {
    return LanguageReadUseCase.getInstance();
  }

  public static LanguageSaveUseCase(): LanguageSaveUseCase {
    return LanguageSaveUseCase.getInstance();
  }

  public static LanguageUpdateUseCase(): LanguageUpdateUseCase {
    return LanguageUpdateUseCase.getInstance();
  }

  public static LanguageDeleteUseCase(): LanguageDeleteUseCase {
    return LanguageDeleteUseCase.getInstance();
  }

  public static LanguageListUseCase(): LanguageListUseCase {
    return LanguageListUseCase.getInstance();
  }
}