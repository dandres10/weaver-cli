import { IPlatformConfigurationResponseEntity } from "./i-auth-login-platform-configuration-response-entity";
import { IPlatformVariationsResponseEntity } from "./i-auth-login-platform-variations-response-entity";

export interface IAuthLoginResponseEntity {
  platform_configuration: IPlatformConfigurationResponseEntity;
  platform_variations: IPlatformVariationsResponseEntity;
  token: string;
}