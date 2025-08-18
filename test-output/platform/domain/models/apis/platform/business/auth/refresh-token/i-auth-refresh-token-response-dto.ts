import { IAuthRefreshTokenPlatformConfigurationResponseDTO } from "./i-auth-refresh-token-platform-configuration-response-dto";
import { IAuthRefreshTokenPlatformVariationsResponseDTO } from "./i-auth-refresh-token-platform-variations-response-dto";

export interface IAuthRefreshTokenResponseDTO {
  platformConfiguration: IAuthRefreshTokenPlatformConfigurationResponseDTO;
  platformVariations: IAuthRefreshTokenPlatformVariationsResponseDTO;
  token: string;
}