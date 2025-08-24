import { IAuthLoginPlatformConfigurationResponseEntity } from "./i-auth-login-platform-configuration-response-entity";
import { IAuthLoginPlatformVariationsResponseEntity } from "./i-auth-login-platform-variations-response-entity";

export interface IAuthLoginResponseEntity {
  platform_configuration: IAuthLoginPlatformConfigurationResponseEntity;
  platform_variations: IAuthLoginPlatformVariationsResponseEntity;
  token: string;
}