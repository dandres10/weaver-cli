import { ApiTokenDeleteUseCase } from "@leon/domain/services/use_cases/apis/leon/entities/apitoken/api-token-delete-use-case";
import { ApiTokenListUseCase } from "@leon/domain/services/use_cases/apis/leon/entities/apitoken/api-token-list-use-case";
import { ApiTokenReadUseCase } from "@leon/domain/services/use_cases/apis/leon/entities/apitoken/api-token-read-use-case";
import { ApiTokenSaveUseCase } from "@leon/domain/services/use_cases/apis/leon/entities/apitoken/api-token-save-use-case";
import { ApiTokenUpdateUseCase } from "@leon/domain/services/use_cases/apis/leon/entities/apitoken/api-token-update-use-case";

export class InjectionPlatformEntitiesApiTokenUseCase {
  public static ApiTokenReadUseCase(): ApiTokenReadUseCase {
    return ApiTokenReadUseCase.getInstance();
  }

  public static ApiTokenSaveUseCase(): ApiTokenSaveUseCase {
    return ApiTokenSaveUseCase.getInstance();
  }

  public static ApiTokenUpdateUseCase(): ApiTokenUpdateUseCase {
    return ApiTokenUpdateUseCase.getInstance();
  }

  public static ApiTokenDeleteUseCase(): ApiTokenDeleteUseCase {
    return ApiTokenDeleteUseCase.getInstance();
  }

  public static ApiTokenListUseCase(): ApiTokenListUseCase {
    return ApiTokenListUseCase.getInstance();
  }
}