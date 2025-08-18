import { AuthLoginUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/auth-login-use-case";
import { AuthRefreshTokenUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/auth-refresh-token-use-case";
import { AuthLogoutUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/auth-logout-use-case";
import { AuthCreateApiTokenUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/auth-create-api-token-use-case";

export class InjectionPlatformBusinessAuthUseCase {
  public static AuthLoginUseCase(): AuthLoginUseCase {
    return AuthLoginUseCase.getInstance();
  }

  public static AuthRefreshTokenUseCase(): AuthRefreshTokenUseCase {
    return AuthRefreshTokenUseCase.getInstance();
  }

  public static AuthLogoutUseCase(): AuthLogoutUseCase {
    return AuthLogoutUseCase.getInstance();
  }

  public static AuthCreateApiTokenUseCase(): AuthCreateApiTokenUseCase {
    return AuthCreateApiTokenUseCase.getInstance();
  }
}