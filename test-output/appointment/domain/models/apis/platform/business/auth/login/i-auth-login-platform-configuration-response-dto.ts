import { IAuthLoginUserResponseDTO } from "./i-auth-login-user-response-dto";
import { IAuthLoginCurrencyResponseDTO } from "./i-auth-login-currency-response-dto";
import { IAuthLoginLocationResponseDTO } from "./i-auth-login-location-response-dto";
import { IAuthLoginLanguageResponseDTO } from "./i-auth-login-language-response-dto";
import { IAuthLoginPlatformResponseDTO } from "./i-auth-login-platform-response-dto";
import { IAuthLoginCountryResponseDTO } from "./i-auth-login-country-response-dto";
import { IAuthLoginCompanyResponseDTO } from "./i-auth-login-company-response-dto";
import { IAuthLoginRolResponseDTO } from "./i-auth-login-rol-response-dto";
import { IAuthLoginPermissionResponseDTO } from "./i-auth-login-permission-response-dto";
import { IAuthLoginMenuResponseDTO } from "./i-auth-login-menu-response-dto";

export interface IAuthLoginPlatformConfigurationResponseDTO {
  user: IAuthLoginUserResponseDTO;
  currency: IAuthLoginCurrencyResponseDTO;
  location: IAuthLoginLocationResponseDTO;
  language: IAuthLoginLanguageResponseDTO;
  platform: IAuthLoginPlatformResponseDTO;
  country: IAuthLoginCountryResponseDTO;
  company: IAuthLoginCompanyResponseDTO;
  rol: IAuthLoginRolResponseDTO;
  permissions: IAuthLoginPermissionResponseDTO[];
  menu: IAuthLoginMenuResponseDTO[];
}