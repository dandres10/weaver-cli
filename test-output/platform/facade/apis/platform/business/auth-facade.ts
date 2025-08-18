import { IConfigDTO } from "@bus/core/interfaces";
import {
  IAuthLoginRequestDTO,
  IAuthLoginResponseDTO,
  IAuthRefreshTokenResponseDTO,
  IAuthLogoutResponseDTO,
  IAuthCreateApiTokenRequestDTO,
  IAuthCreateApiTokenResponseDTO,
} from "@platform/domain/models/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/business/injection-platform-business-auth-use-case";

export class AuthFacade {
  private static instance: AuthFacade;

  private readonly loginUseCase = InjectionPlatformBusinessAuthUseCase.AuthLoginUseCase();
  private readonly refreshTokenUseCase = InjectionPlatformBusinessAuthUseCase.AuthRefreshTokenUseCase();
  private readonly logoutUseCase = InjectionPlatformBusinessAuthUseCase.AuthLogoutUseCase();
  private readonly createApiTokenUseCase = InjectionPlatformBusinessAuthUseCase.AuthCreateApiTokenUseCase();

  public static getInstance(): AuthFacade {
    if (!AuthFacade.instance)
      AuthFacade.instance = new AuthFacade();
    return AuthFacade.instance;
  }

  public async login(params: IAuthLoginRequestDTO, config?: IConfigDTO): Promise<IAuthLoginResponseDTO | null> {
    return await this.loginUseCase.execute(params, config);
  }

  public async refreshToken(config?: IConfigDTO): Promise<IAuthRefreshTokenResponseDTO | null> {
    return await this.refreshTokenUseCase.execute(config);
  }

  public async logout(config?: IConfigDTO): Promise<IAuthLogoutResponseDTO | null> {
    return await this.logoutUseCase.execute(config);
  }

  public async createApiToken(params: IAuthCreateApiTokenRequestDTO, config?: IConfigDTO): Promise<IAuthCreateApiTokenResponseDTO | null> {
    return await this.createApiTokenUseCase.execute(params, config);
  }
}