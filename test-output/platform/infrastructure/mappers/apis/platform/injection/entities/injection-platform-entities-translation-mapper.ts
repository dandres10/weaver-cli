import { TranslationDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/entities/translation/translation-delete-mapper";
import { TranslationEntityMapper } from "@platform/infrastructure/mappers/apis/platform/entities/translation/translation-entity-mapper";
import { TranslationReadMapper } from "@platform/infrastructure/mappers/apis/platform/entities/translation/translation-read-mapper";
import { TranslationSaveMapper } from "@platform/infrastructure/mappers/apis/platform/entities/translation/translation-save-mapper";
import { TranslationUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/entities/translation/translation-update-mapper";

export class InjectionPlatformEntitiesTranslationMapper {
  public static TranslationEntityMapper(): TranslationEntityMapper {
    return TranslationEntityMapper.getInstance();
  }

  public static TranslationSaveMapper(): TranslationSaveMapper {
    return TranslationSaveMapper.getInstance();
  }

  public static TranslationReadMapper(): TranslationReadMapper {
    return TranslationReadMapper.getInstance();
  }

  public static TranslationUpdateMapper(): TranslationUpdateMapper {
    return TranslationUpdateMapper.getInstance();
  }

  public static TranslationDeleteMapper(): TranslationDeleteMapper {
    return TranslationDeleteMapper.getInstance();
  }
}