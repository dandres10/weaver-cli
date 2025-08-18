import { IConfigDTO } from "@bus/core/interfaces";
import { 
  IAuthLoginRequestDTO,
  IAuthLoginResponseDTO,
  IAuthRefreshTokenResponseDTO,
  IAuthLogoutResponseDTO,
  IAuthCreateApiTokenRequestDTO,
  IAuthCreateApiTokenResponseDTO
} from "@platform/domain/models/apis/platform/business/auth";

export interface IAuthRepository {
  login(params: IAuthLoginRequestDTO, config?: IConfigDTO): Promise<IAuthLoginResponseDTO | null>;
  refresh-token(params: any, config?: IConfigDTO): Promise<IAuthRefreshTokenResponseDTO | null>;
  logout(params: any, config?: IConfigDTO): Promise<IAuthLogoutResponseDTO | null>;
  create-api-token(params: IAuthCreateApiTokenRequestDTO, config?: IConfigDTO): Promise<IAuthCreateApiTokenResponseDTO | null>;
}