import { IAuthRefreshTokenCurrencyResponseEntity } from "./i-auth-refresh-token-currency-response-entity";
import { IAuthRefreshTokenLocationResponseEntity } from "./i-auth-refresh-token-location-response-entity";
import { IAuthRefreshTokenLanguageResponseEntity } from "./i-auth-refresh-token-language-response-entity";
import { IAuthRefreshTokenCompanyResponseEntity } from "./i-auth-refresh-token-company-response-entity";

export interface IAuthRefreshTokenPlatformVariationsResponseEntity {
  currencies: IAuthRefreshTokenCurrencyResponseEntity[];
  locations: IAuthRefreshTokenLocationResponseEntity[];
  languages: IAuthRefreshTokenLanguageResponseEntity[];
  companies: IAuthRefreshTokenCompanyResponseEntity[];
}