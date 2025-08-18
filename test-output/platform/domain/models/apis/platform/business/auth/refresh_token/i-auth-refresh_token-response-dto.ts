import { IPlatformConfigurationResponseDTO } from "./i-platform-configuration-response-dto";
import { IPlatformVariationsResponseDTO } from "./i-platform-variations-response-dto";

export interface IAuthRefreshTokenResponseDTO {
  platformConfiguration: IPlatformConfigurationResponseDTO;
  platformVariations: IPlatformVariationsResponseDTO;
  token: string;
}