import { IUserLoginResponseEntity } from "./i-user-login-response-entity";
import { ICurrencyLoginResponseEntity } from "./i-currency-login-response-entity";
import { ILocationLoginResponseEntity } from "./i-location-login-response-entity";
import { ILanguageLoginResponseEntity } from "./i-language-login-response-entity";
import { IPlatformLoginResponseEntity } from "./i-platform-login-response-entity";
import { ICountryLoginResponseEntity } from "./i-country-login-response-entity";
import { ICompanyLoginResponseEntity } from "./i-company-login-response-entity";
import { IRolLoginResponseEntity } from "./i-rol-login-response-entity";
import { IPermissionLoginResponseEntity } from "./i-permission-login-response-entity";
import { IMenuLoginResponseEntity } from "./i-menu-login-response-entity";

export interface IPlatformConfigurationResponseEntity {
  user: IUserLoginResponseEntity;
  currency: ICurrencyLoginResponseEntity;
  location: ILocationLoginResponseEntity;
  language: ILanguageLoginResponseEntity;
  platform: IPlatformLoginResponseEntity;
  country: ICountryLoginResponseEntity;
  company: ICompanyLoginResponseEntity;
  rol: IRolLoginResponseEntity;
  permissions: IPermissionLoginResponseEntity[];
  menu: IMenuLoginResponseEntity[];
}