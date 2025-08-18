import { IUserLoginResponseDTO } from "./i-user-login-response-dto";
import { ICurrencyLoginResponseDTO } from "./i-currency-login-response-dto";
import { ILocationLoginResponseDTO } from "./i-location-login-response-dto";
import { ILanguageLoginResponseDTO } from "./i-language-login-response-dto";
import { IPlatformLoginResponseDTO } from "./i-platform-login-response-dto";
import { ICountryLoginResponseDTO } from "./i-country-login-response-dto";
import { ICompanyLoginResponseDTO } from "./i-company-login-response-dto";
import { IRolLoginResponseDTO } from "./i-rol-login-response-dto";
import { IPermissionLoginResponseDTO } from "./i-permission-login-response-dto";
import { IMenuLoginResponseDTO } from "./i-menu-login-response-dto";

export interface IPlatformConfigurationResponseDTO {
  user: IUserLoginResponseDTO;
  currency: ICurrencyLoginResponseDTO;
  location: ILocationLoginResponseDTO;
  language: ILanguageLoginResponseDTO;
  platform: IPlatformLoginResponseDTO;
  country: ICountryLoginResponseDTO;
  company: ICompanyLoginResponseDTO;
  rol: IRolLoginResponseDTO;
  permissions: IPermissionLoginResponseDTO[];
  menu: IMenuLoginResponseDTO[];
}