import { ApiTokenDeleteMapper } from "@leon/infrastructure/mappers/apis/leon/entities/apitoken/api-token-delete-mapper";
import { ApiTokenEntityMapper } from "@leon/infrastructure/mappers/apis/leon/entities/apitoken/api-token-entity-mapper";
import { ApiTokenReadMapper } from "@leon/infrastructure/mappers/apis/leon/entities/apitoken/api-token-read-mapper";
import { ApiTokenSaveMapper } from "@leon/infrastructure/mappers/apis/leon/entities/apitoken/api-token-save-mapper";
import { ApiTokenUpdateMapper } from "@leon/infrastructure/mappers/apis/leon/entities/apitoken/api-token-update-mapper";

export class InjectionPlatformEntitiesApiTokenMapper {
  public static ApiTokenEntityMapper(): ApiTokenEntityMapper {
    return ApiTokenEntityMapper.getInstance();
  }

  public static ApiTokenSaveMapper(): ApiTokenSaveMapper {
    return ApiTokenSaveMapper.getInstance();
  }

  public static ApiTokenReadMapper(): ApiTokenReadMapper {
    return ApiTokenReadMapper.getInstance();
  }

  public static ApiTokenUpdateMapper(): ApiTokenUpdateMapper {
    return ApiTokenUpdateMapper.getInstance();
  }

  public static ApiTokenDeleteMapper(): ApiTokenDeleteMapper {
    return ApiTokenDeleteMapper.getInstance();
  }
}