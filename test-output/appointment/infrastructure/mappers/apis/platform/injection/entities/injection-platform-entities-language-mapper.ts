import { LanguageDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/entities/language/language-delete-mapper";
import { LanguageEntityMapper } from "@platform/infrastructure/mappers/apis/platform/entities/language/language-entity-mapper";
import { LanguageReadMapper } from "@platform/infrastructure/mappers/apis/platform/entities/language/language-read-mapper";
import { LanguageSaveMapper } from "@platform/infrastructure/mappers/apis/platform/entities/language/language-save-mapper";
import { LanguageUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/entities/language/language-update-mapper";

export class InjectionPlatformEntitiesLanguageMapper {
  public static LanguageEntityMapper(): LanguageEntityMapper {
    return LanguageEntityMapper.getInstance();
  }

  public static LanguageSaveMapper(): LanguageSaveMapper {
    return LanguageSaveMapper.getInstance();
  }

  public static LanguageReadMapper(): LanguageReadMapper {
    return LanguageReadMapper.getInstance();
  }

  public static LanguageUpdateMapper(): LanguageUpdateMapper {
    return LanguageUpdateMapper.getInstance();
  }

  public static LanguageDeleteMapper(): LanguageDeleteMapper {
    return LanguageDeleteMapper.getInstance();
  }
}