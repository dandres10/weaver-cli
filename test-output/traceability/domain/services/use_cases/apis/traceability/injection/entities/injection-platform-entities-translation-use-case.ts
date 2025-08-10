import { TranslationDeleteUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/translation/translation-delete-use-case";
import { TranslationListUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/translation/translation-list-use-case";
import { TranslationReadUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/translation/translation-read-use-case";
import { TranslationSaveUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/translation/translation-save-use-case";
import { TranslationUpdateUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/translation/translation-update-use-case";

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