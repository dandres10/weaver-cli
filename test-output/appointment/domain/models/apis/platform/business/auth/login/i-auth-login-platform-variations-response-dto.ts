import { IAuthLoginCurrencyResponseDTO } from "./i-auth-login-currency-response-dto";
import { IAuthLoginLocationResponseDTO } from "./i-auth-login-location-response-dto";
import { IAuthLoginLanguageResponseDTO } from "./i-auth-login-language-response-dto";
import { IAuthLoginCompanyResponseDTO } from "./i-auth-login-company-response-dto";

export interface IAuthLoginPlatformVariationsResponseDTO {
  currencies: IAuthLoginCurrencyResponseDTO[];
  locations: IAuthLoginLocationResponseDTO[];
  languages: IAuthLoginLanguageResponseDTO[];
  companies: IAuthLoginCompanyResponseDTO[];
}