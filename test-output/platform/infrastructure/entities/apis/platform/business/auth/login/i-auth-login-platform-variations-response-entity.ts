import { IAuthLoginCurrencyResponseEntity } from "./i-auth-login-currency-response-entity";
import { IAuthLoginLocationResponseEntity } from "./i-auth-login-location-response-entity";
import { IAuthLoginLanguageResponseEntity } from "./i-auth-login-language-response-entity";
import { IAuthLoginCompanyResponseEntity } from "./i-auth-login-company-response-entity";

export interface IAuthLoginPlatformVariationsResponseEntity {
  currencies: IAuthLoginCurrencyResponseEntity[];
  locations: IAuthLoginLocationResponseEntity[];
  languages: IAuthLoginLanguageResponseEntity[];
  companies: IAuthLoginCompanyResponseEntity[];
}