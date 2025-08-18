import { IPlatformConfigurationResponseEntity } from "./i-auth-refresh-token-platform-configuration-response-entity";
import { IPlatformVariationsResponseEntity } from "./i-auth-refresh-token-platform-variations-response-entity";

export interface IAuthRefreshTokenResponseEntity {
  platform_configuration: IPlatformConfigurationResponseEntity;
  platform_variations: IPlatformVariationsResponseEntity;
  token: string;
}