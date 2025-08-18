import { IAuthRefreshTokenCurrencyResponseDTO } from "./i-auth-refresh-token-currency-response-dto";
import { IAuthRefreshTokenLocationResponseDTO } from "./i-auth-refresh-token-location-response-dto";
import { IAuthRefreshTokenLanguageResponseDTO } from "./i-auth-refresh-token-language-response-dto";
import { IAuthRefreshTokenCompanyResponseDTO } from "./i-auth-refresh-token-company-response-dto";

export interface IAuthRefreshTokenPlatformVariationsResponseDTO {
  currencies: IAuthRefreshTokenCurrencyResponseDTO[];
  locations: IAuthRefreshTokenLocationResponseDTO[];
  languages: IAuthRefreshTokenLanguageResponseDTO[];
  companies: IAuthRefreshTokenCompanyResponseDTO[];
}