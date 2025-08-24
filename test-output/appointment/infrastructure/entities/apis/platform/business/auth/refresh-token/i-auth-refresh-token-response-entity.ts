import { IAuthRefreshTokenPlatformConfigurationResponseEntity } from "./i-auth-refresh-token-platform-configuration-response-entity";
import { IAuthRefreshTokenPlatformVariationsResponseEntity } from "./i-auth-refresh-token-platform-variations-response-entity";

export interface IAuthRefreshTokenResponseEntity {
  platform_configuration: IAuthRefreshTokenPlatformConfigurationResponseEntity;
  platform_variations: IAuthRefreshTokenPlatformVariationsResponseEntity;
  token: string;
}