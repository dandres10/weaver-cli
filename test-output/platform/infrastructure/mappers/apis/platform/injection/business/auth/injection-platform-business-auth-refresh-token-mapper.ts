import { AuthRefreshTokenResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-response-mapper";
import { AuthRefreshTokenPlatformConfigurationResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-platform-configuration-response-mapper";
import { AuthRefreshTokenUserLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-user-login-response-mapper";
import { AuthRefreshTokenCurrencyLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-currency-login-response-mapper";
import { AuthRefreshTokenLocationLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-location-login-response-mapper";
import { AuthRefreshTokenLanguageLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-language-login-response-mapper";
import { AuthRefreshTokenPlatformLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-platform-login-response-mapper";
import { AuthRefreshTokenCountryLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-country-login-response-mapper";
import { AuthRefreshTokenCompanyLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-company-login-response-mapper";
import { AuthRefreshTokenRolLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-rol-login-response-mapper";
import { AuthRefreshTokenPermissionLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-permission-login-response-mapper";
import { AuthRefreshTokenMenuLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-menu-login-response-mapper";
import { AuthRefreshTokenPlatformVariationsResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh-token/auth-refresh-token-platform-variations-response-mapper";

export class InjectionPlatformBusinessAuthRefreshTokenMapper {
  public static AuthRefreshTokenResponseMapper(): AuthRefreshTokenResponseMapper {
    return AuthRefreshTokenResponseMapper.getInstance();
  }

  public static AuthRefreshTokenPlatformConfigurationResponseMapper(): AuthRefreshTokenPlatformConfigurationResponseMapper {
    return AuthRefreshTokenPlatformConfigurationResponseMapper.getInstance();
  }

  public static AuthRefreshTokenUserLoginResponseMapper(): AuthRefreshTokenUserLoginResponseMapper {
    return AuthRefreshTokenUserLoginResponseMapper.getInstance();
  }

  public static AuthRefreshTokenCurrencyLoginResponseMapper(): AuthRefreshTokenCurrencyLoginResponseMapper {
    return AuthRefreshTokenCurrencyLoginResponseMapper.getInstance();
  }

  public static AuthRefreshTokenLocationLoginResponseMapper(): AuthRefreshTokenLocationLoginResponseMapper {
    return AuthRefreshTokenLocationLoginResponseMapper.getInstance();
  }

  public static AuthRefreshTokenLanguageLoginResponseMapper(): AuthRefreshTokenLanguageLoginResponseMapper {
    return AuthRefreshTokenLanguageLoginResponseMapper.getInstance();
  }

  public static AuthRefreshTokenPlatformLoginResponseMapper(): AuthRefreshTokenPlatformLoginResponseMapper {
    return AuthRefreshTokenPlatformLoginResponseMapper.getInstance();
  }

  public static AuthRefreshTokenCountryLoginResponseMapper(): AuthRefreshTokenCountryLoginResponseMapper {
    return AuthRefreshTokenCountryLoginResponseMapper.getInstance();
  }

  public static AuthRefreshTokenCompanyLoginResponseMapper(): AuthRefreshTokenCompanyLoginResponseMapper {
    return AuthRefreshTokenCompanyLoginResponseMapper.getInstance();
  }

  public static AuthRefreshTokenRolLoginResponseMapper(): AuthRefreshTokenRolLoginResponseMapper {
    return AuthRefreshTokenRolLoginResponseMapper.getInstance();
  }

  public static AuthRefreshTokenPermissionLoginResponseMapper(): AuthRefreshTokenPermissionLoginResponseMapper {
    return AuthRefreshTokenPermissionLoginResponseMapper.getInstance();
  }

  public static AuthRefreshTokenMenuLoginResponseMapper(): AuthRefreshTokenMenuLoginResponseMapper {
    return AuthRefreshTokenMenuLoginResponseMapper.getInstance();
  }

  public static AuthRefreshTokenPlatformVariationsResponseMapper(): AuthRefreshTokenPlatformVariationsResponseMapper {
    return AuthRefreshTokenPlatformVariationsResponseMapper.getInstance();
  }
}