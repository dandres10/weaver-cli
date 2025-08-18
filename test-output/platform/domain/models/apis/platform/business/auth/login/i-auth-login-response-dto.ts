import { IPlatformConfigurationResponseDTO } from "./i-auth-login-platform-configuration-response-dto";
import { IPlatformVariationsResponseDTO } from "./i-auth-login-platform-variations-response-dto";

export interface IAuthLoginResponseDTO {
  platformConfiguration: IPlatformConfigurationResponseDTO;
  platformVariations: IPlatformVariationsResponseDTO;
  token: string;
}