import { ICurrencyLoginResponseEntity } from "./i-currency-login-response-entity";
import { ILocationLoginResponseEntity } from "./i-location-login-response-entity";
import { ILanguageLoginResponseEntity } from "./i-language-login-response-entity";
import { ICompanyLoginResponseEntity } from "./i-company-login-response-entity";

export interface IPlatformVariationsResponseEntity {
  currencies: ICurrencyLoginResponseEntity[];
  locations: ILocationLoginResponseEntity[];
  languages: ILanguageLoginResponseEntity[];
  companies: ICompanyLoginResponseEntity[];
}