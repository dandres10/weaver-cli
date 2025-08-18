import { AuthLoginUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/login/auth-login-use-case";
import { AuthCreateApiTokenUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/create-api-token/auth-create-api-token-use-case";

export class InjectionPlatformBusinessAuthUseCase {
  public static AuthLoginUseCase(): AuthLoginUseCase {
    return AuthLoginUseCase.getInstance();
  }

  public static AuthCreateApiTokenUseCase(): AuthCreateApiTokenUseCase {
    return AuthCreateApiTokenUseCase.getInstance();
  }
}