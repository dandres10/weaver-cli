import { IAuthLoginUserResponseEntity } from "./i-auth-login-user-response-entity";
import { IAuthLoginCurrencyResponseEntity } from "./i-auth-login-currency-response-entity";
import { IAuthLoginLocationResponseEntity } from "./i-auth-login-location-response-entity";
import { IAuthLoginLanguageResponseEntity } from "./i-auth-login-language-response-entity";
import { IAuthLoginPlatformResponseEntity } from "./i-auth-login-platform-response-entity";
import { IAuthLoginCountryResponseEntity } from "./i-auth-login-country-response-entity";
import { IAuthLoginCompanyResponseEntity } from "./i-auth-login-company-response-entity";
import { IAuthLoginRolResponseEntity } from "./i-auth-login-rol-response-entity";
import { IAuthLoginPermissionResponseEntity } from "./i-auth-login-permission-response-entity";
import { IAuthLoginMenuResponseEntity } from "./i-auth-login-menu-response-entity";

export interface IAuthLoginPlatformConfigurationResponseEntity {
  user: IAuthLoginUserResponseEntity;
  currency: IAuthLoginCurrencyResponseEntity;
  location: IAuthLoginLocationResponseEntity;
  language: IAuthLoginLanguageResponseEntity;
  platform: IAuthLoginPlatformResponseEntity;
  country: IAuthLoginCountryResponseEntity;
  company: IAuthLoginCompanyResponseEntity;
  rol: IAuthLoginRolResponseEntity;
  permissions: IAuthLoginPermissionResponseEntity[];
  menu: IAuthLoginMenuResponseEntity[];
}