import { TranslationDeleteUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/translation/translation-delete-use-case";
import { TranslationListUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/translation/translation-list-use-case";
import { TranslationReadUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/translation/translation-read-use-case";
import { TranslationSaveUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/translation/translation-save-use-case";
import { TranslationUpdateUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/translation/translation-update-use-case";

export class InjectionPlatformEntitiesTranslationUseCase {
  public static TranslationReadUseCase(): TranslationReadUseCase {
    return TranslationReadUseCase.getInstance();
  }

  public static TranslationSaveUseCase(): TranslationSaveUseCase {
    return TranslationSaveUseCase.getInstance();
  }

  public static TranslationUpdateUseCase(): TranslationUpdateUseCase {
    return TranslationUpdateUseCase.getInstance();
  }

  public static TranslationDeleteUseCase(): TranslationDeleteUseCase {
    return TranslationDeleteUseCase.getInstance();
  }

  public static TranslationListUseCase(): TranslationListUseCase {
    return TranslationListUseCase.getInstance();
  }
}