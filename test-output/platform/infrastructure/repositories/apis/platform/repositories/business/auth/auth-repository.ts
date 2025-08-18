import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { IAuthRepository } from "@platform/domain/services/repositories/apis/platform/business/i-auth-repository";
import { IAuthLoginResponseDTO, IAuthRefreshTokenResponseDTO, IAuthLogoutResponseDTO, IAuthCreateApiTokenResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginRequestEntity, IAuthLoginResponseEntity, IAuthRefreshTokenResponseEntity, IAuthLogoutResponseEntity, IAuthCreateApiTokenRequestEntity, IAuthCreateApiTokenResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";
import { InjectionPlatformBusinessAuthRefreshTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-refresh-token-mapper";
import { InjectionPlatformBusinessAuthLogoutMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-logout-mapper";
import { InjectionPlatformBusinessAuthCreateApiTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-create-api-token-mapper";

export class AuthRepository extends IAuthRepository {

  private static instance: AuthRepository;
  private readonly resolve = InjectionCore.Resolve();
  private loginResponseMapper = InjectionPlatformBusinessAuthLoginMapper.AuthLoginResponseMapper();
  private refreshTokenResponseMapper = InjectionPlatformBusinessAuthRefreshTokenMapper.AuthRefreshTokenResponseMapper();
  private logoutResponseMapper = InjectionPlatformBusinessAuthLogoutMapper.AuthLogoutResponseMapper();
  private createApiTokenResponseMapper = InjectionPlatformBusinessAuthCreateApiTokenMapper.AuthCreateApiTokenResponseMapper();

  private constructor() {
    super();
  }

  public static getInstance(): AuthRepository {
    if (!AuthRepository.instance)
      AuthRepository.instance = new AuthRepository();
    return AuthRepository.instance;
  }

  public async login(
    params: IAuthLoginRequestEntity, config: IConfigDTO = CONST_CORE_DTO.CONFIG
  ): Promise<IAuthLoginResponseDTO | null> {
    if (config.loadService)
      return platformAxios
        .post(CONST_PLATFORM_API_ROUTES.AUTH_LOGIN, params)
        .then(({ data }) => {
          const entity = this.resolve.ResolveRequest<IAuthLoginResponseEntity>(data);
          if (entity)
            return this.loginResponseMapper.mapFrom(entity);
          return null;
        });
    return null;
  }

  public async refreshToken(
    config: IConfigDTO = CONST_CORE_DTO.CONFIG
  ): Promise<IAuthRefreshTokenResponseDTO | null> {
    if (config.loadService)
      return platformAxios
        .post(CONST_PLATFORM_API_ROUTES.AUTH_REFRESH_TOKEN, {})
        .then(({ data }) => {
          const entity = this.resolve.ResolveRequest<IAuthRefreshTokenResponseEntity>(data);
          if (entity)
            return this.refreshTokenResponseMapper.mapFrom(entity);
          return null;
        });
    return null;
  }

  public async logout(
    config: IConfigDTO = CONST_CORE_DTO.CONFIG
  ): Promise<IAuthLogoutResponseDTO | null> {
    if (config.loadService)
      return platformAxios
        .post(CONST_PLATFORM_API_ROUTES.AUTH_LOGOUT, {})
        .then(({ data }) => {
          const entity = this.resolve.ResolveRequest<IAuthLogoutResponseEntity>(data);
          if (entity)
            return this.logoutResponseMapper.mapFrom(entity);
          return null;
        });
    return null;
  }

  public async createApiToken(
    params: IAuthCreateApiTokenRequestEntity, config: IConfigDTO = CONST_CORE_DTO.CONFIG
  ): Promise<IAuthCreateApiTokenResponseDTO | null> {
    if (config.loadService)
      return platformAxios
        .post(CONST_PLATFORM_API_ROUTES.AUTH_CREATE_API_TOKEN, params)
        .then(({ data }) => {
          const entity = this.resolve.ResolveRequest<IAuthCreateApiTokenResponseEntity>(data);
          if (entity)
            return this.createApiTokenResponseMapper.mapFrom(entity);
          return null;
        });
    return null;
  }
}