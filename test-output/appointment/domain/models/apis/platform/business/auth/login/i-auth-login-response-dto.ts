import { IAuthLoginPlatformConfigurationResponseDTO } from "./i-auth-login-platform-configuration-response-dto";
import { IAuthLoginPlatformVariationsResponseDTO } from "./i-auth-login-platform-variations-response-dto";

export interface IAuthLoginResponseDTO {
  platformConfiguration: IAuthLoginPlatformConfigurationResponseDTO;
  platformVariations: IAuthLoginPlatformVariationsResponseDTO;
  token: string;
}