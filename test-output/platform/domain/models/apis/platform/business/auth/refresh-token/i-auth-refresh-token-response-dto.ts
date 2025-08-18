import { IPlatformConfigurationResponseDTO } from "./i-auth-refresh-token-platform-configuration-response-dto";
import { IPlatformVariationsResponseDTO } from "./i-auth-refresh-token-platform-variations-response-dto";

export interface IAuthRefreshTokenResponseDTO {
  platformConfiguration: IPlatformConfigurationResponseDTO;
  platformVariations: IPlatformVariationsResponseDTO;
  token: string;
}