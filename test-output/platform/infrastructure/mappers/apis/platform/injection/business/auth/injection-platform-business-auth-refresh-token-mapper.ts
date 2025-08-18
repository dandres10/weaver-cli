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

  public static PlatformConfigurationResponseMapper(): AuthRefreshTokenPlatformConfigurationResponseMapper {
    return AuthRefreshTokenPlatformConfigurationResponseMapper.getInstance();
  }

  public static UserLoginResponseMapper(): AuthRefreshTokenUserLoginResponseMapper {
    return AuthRefreshTokenUserLoginResponseMapper.getInstance();
  }

  public static CurrencyLoginResponseMapper(): AuthRefreshTokenCurrencyLoginResponseMapper {
    return AuthRefreshTokenCurrencyLoginResponseMapper.getInstance();
  }

  public static LocationLoginResponseMapper(): AuthRefreshTokenLocationLoginResponseMapper {
    return AuthRefreshTokenLocationLoginResponseMapper.getInstance();
  }

  public static LanguageLoginResponseMapper(): AuthRefreshTokenLanguageLoginResponseMapper {
    return AuthRefreshTokenLanguageLoginResponseMapper.getInstance();
  }

  public static PlatformLoginResponseMapper(): AuthRefreshTokenPlatformLoginResponseMapper {
    return AuthRefreshTokenPlatformLoginResponseMapper.getInstance();
  }

  public static CountryLoginResponseMapper(): AuthRefreshTokenCountryLoginResponseMapper {
    return AuthRefreshTokenCountryLoginResponseMapper.getInstance();
  }

  public static CompanyLoginResponseMapper(): AuthRefreshTokenCompanyLoginResponseMapper {
    return AuthRefreshTokenCompanyLoginResponseMapper.getInstance();
  }

  public static RolLoginResponseMapper(): AuthRefreshTokenRolLoginResponseMapper {
    return AuthRefreshTokenRolLoginResponseMapper.getInstance();
  }

  public static PermissionLoginResponseMapper(): AuthRefreshTokenPermissionLoginResponseMapper {
    return AuthRefreshTokenPermissionLoginResponseMapper.getInstance();
  }

  public static MenuLoginResponseMapper(): AuthRefreshTokenMenuLoginResponseMapper {
    return AuthRefreshTokenMenuLoginResponseMapper.getInstance();
  }

  public static PlatformVariationsResponseMapper(): AuthRefreshTokenPlatformVariationsResponseMapper {
    return AuthRefreshTokenPlatformVariationsResponseMapper.getInstance();
  }
}