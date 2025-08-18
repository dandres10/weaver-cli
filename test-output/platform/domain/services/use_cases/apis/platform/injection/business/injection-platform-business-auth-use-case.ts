import { AuthSaveUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/auth-save-use-case";
import { AuthReadUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/auth-read-use-case";
import { AuthUpdateUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/auth-update-use-case";
import { AuthDeleteUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/auth-delete-use-case";
import { AuthListUseCase } from "@platform/domain/services/use_cases/apis/platform/business/auth/auth-list-use-case";

export class InjectionPlatformBusinessAuthUseCase {
  private static instance: InjectionPlatformBusinessAuthUseCase;

  public static getInstance(): InjectionPlatformBusinessAuthUseCase {
    if (!InjectionPlatformBusinessAuthUseCase.instance)
      InjectionPlatformBusinessAuthUseCase.instance = new InjectionPlatformBusinessAuthUseCase();
    return InjectionPlatformBusinessAuthUseCase.instance;
  }

  public static AuthSaveUseCase(): AuthSaveUseCase {
    return AuthSaveUseCase.getInstance();
  }

  public static AuthReadUseCase(): AuthReadUseCase {
    return AuthReadUseCase.getInstance();
  }

  public static AuthUpdateUseCase(): AuthUpdateUseCase {
    return AuthUpdateUseCase.getInstance();
  }

  public static AuthDeleteUseCase(): AuthDeleteUseCase {
    return AuthDeleteUseCase.getInstance();
  }

  public static AuthListUseCase(): AuthListUseCase {
    return AuthListUseCase.getInstance();
  }
}