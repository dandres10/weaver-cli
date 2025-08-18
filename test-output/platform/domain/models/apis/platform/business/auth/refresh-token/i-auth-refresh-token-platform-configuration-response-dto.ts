import { IAuthRefreshTokenUserResponseDTO } from "./i-auth-refresh-token-user-response-dto";
import { IAuthRefreshTokenCurrencyResponseDTO } from "./i-auth-refresh-token-currency-response-dto";
import { IAuthRefreshTokenLocationResponseDTO } from "./i-auth-refresh-token-location-response-dto";
import { IAuthRefreshTokenLanguageResponseDTO } from "./i-auth-refresh-token-language-response-dto";
import { IAuthRefreshTokenPlatformResponseDTO } from "./i-auth-refresh-token-platform-response-dto";
import { IAuthRefreshTokenCountryResponseDTO } from "./i-auth-refresh-token-country-response-dto";
import { IAuthRefreshTokenCompanyResponseDTO } from "./i-auth-refresh-token-company-response-dto";
import { IAuthRefreshTokenRolResponseDTO } from "./i-auth-refresh-token-rol-response-dto";
import { IAuthRefreshTokenPermissionResponseDTO } from "./i-auth-refresh-token-permission-response-dto";
import { IAuthRefreshTokenMenuResponseDTO } from "./i-auth-refresh-token-menu-response-dto";

export interface IAuthRefreshTokenPlatformConfigurationResponseDTO {
  user: IAuthRefreshTokenUserResponseDTO;
  currency: IAuthRefreshTokenCurrencyResponseDTO;
  location: IAuthRefreshTokenLocationResponseDTO;
  language: IAuthRefreshTokenLanguageResponseDTO;
  platform: IAuthRefreshTokenPlatformResponseDTO;
  country: IAuthRefreshTokenCountryResponseDTO;
  company: IAuthRefreshTokenCompanyResponseDTO;
  rol: IAuthRefreshTokenRolResponseDTO;
  permissions: IAuthRefreshTokenPermissionResponseDTO[];
  menu: IAuthRefreshTokenMenuResponseDTO[];
}