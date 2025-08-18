import { IAuthRefreshTokenUserResponseEntity } from "./i-auth-refresh-token-user-response-entity";
import { IAuthRefreshTokenCurrencyResponseEntity } from "./i-auth-refresh-token-currency-response-entity";
import { IAuthRefreshTokenLocationResponseEntity } from "./i-auth-refresh-token-location-response-entity";
import { IAuthRefreshTokenLanguageResponseEntity } from "./i-auth-refresh-token-language-response-entity";
import { IAuthRefreshTokenPlatformResponseEntity } from "./i-auth-refresh-token-platform-response-entity";
import { IAuthRefreshTokenCountryResponseEntity } from "./i-auth-refresh-token-country-response-entity";
import { IAuthRefreshTokenCompanyResponseEntity } from "./i-auth-refresh-token-company-response-entity";
import { IAuthRefreshTokenRolResponseEntity } from "./i-auth-refresh-token-rol-response-entity";
import { IAuthRefreshTokenPermissionResponseEntity } from "./i-auth-refresh-token-permission-response-entity";
import { IAuthRefreshTokenMenuResponseEntity } from "./i-auth-refresh-token-menu-response-entity";

export interface IAuthRefreshTokenPlatformConfigurationResponseEntity {
  user: IAuthRefreshTokenUserResponseEntity;
  currency: IAuthRefreshTokenCurrencyResponseEntity;
  location: IAuthRefreshTokenLocationResponseEntity;
  language: IAuthRefreshTokenLanguageResponseEntity;
  platform: IAuthRefreshTokenPlatformResponseEntity;
  country: IAuthRefreshTokenCountryResponseEntity;
  company: IAuthRefreshTokenCompanyResponseEntity;
  rol: IAuthRefreshTokenRolResponseEntity;
  permissions: IAuthRefreshTokenPermissionResponseEntity[];
  menu: IAuthRefreshTokenMenuResponseEntity[];
}