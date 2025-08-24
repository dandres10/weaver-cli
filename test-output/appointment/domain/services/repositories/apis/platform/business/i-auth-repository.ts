import { IConfigDTO } from "@bus/core/interfaces";
import { 
  IAuthLoginResponseDTO,
  IAuthRefreshTokenResponseDTO,
  IAuthLogoutResponseDTO,
  IAuthCreateApiTokenResponseDTO
} from "@platform/domain/models/apis/platform/business/auth";
import {
  IAuthLoginRequestEntity,
  IAuthCreateApiTokenRequestEntity
} from "@platform/infrastructure/entities/apis/platform/business/auth";

export abstract class IAuthRepository {
  abstract login(params: IAuthLoginRequestEntity, config: IConfigDTO): Promise<IAuthLoginResponseDTO | null>;
  abstract refreshToken(config: IConfigDTO): Promise<IAuthRefreshTokenResponseDTO | null>;
  abstract logout(config: IConfigDTO): Promise<IAuthLogoutResponseDTO | null>;
  abstract createApiToken(params: IAuthCreateApiTokenRequestEntity, config: IConfigDTO): Promise<IAuthCreateApiTokenResponseDTO | null>;
}