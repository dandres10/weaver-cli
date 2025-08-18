import { AuthLoginRequestMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-request-mapper";
import { AuthLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-response-mapper";
import { AuthLoginPlatformConfigurationResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-platform-configuration-response-mapper";
import { AuthLoginUserResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-user-response-mapper";
import { AuthLoginCurrencyResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-currency-response-mapper";
import { AuthLoginLocationResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-location-response-mapper";
import { AuthLoginLanguageResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-language-response-mapper";
import { AuthLoginPlatformResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-platform-response-mapper";
import { AuthLoginCountryResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-country-response-mapper";
import { AuthLoginCompanyResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-company-response-mapper";
import { AuthLoginRolResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-rol-response-mapper";
import { AuthLoginPermissionResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-permission-response-mapper";
import { AuthLoginMenuResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-menu-response-mapper";
import { AuthLoginPlatformVariationsResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-platform-variations-response-mapper";

export class InjectionPlatformBusinessAuthLoginMapper {
  public static AuthLoginRequestMapper(): AuthLoginRequestMapper {
    return AuthLoginRequestMapper.getInstance();
  }

  public static AuthLoginResponseMapper(): AuthLoginResponseMapper {
    return AuthLoginResponseMapper.getInstance();
  }

  public static PlatformConfigurationResponseMapper(): AuthLoginPlatformConfigurationResponseMapper {
    return AuthLoginPlatformConfigurationResponseMapper.getInstance();
  }

  public static UserResponseMapper(): AuthLoginUserResponseMapper {
    return AuthLoginUserResponseMapper.getInstance();
  }

  public static CurrencyResponseMapper(): AuthLoginCurrencyResponseMapper {
    return AuthLoginCurrencyResponseMapper.getInstance();
  }

  public static LocationResponseMapper(): AuthLoginLocationResponseMapper {
    return AuthLoginLocationResponseMapper.getInstance();
  }

  public static LanguageResponseMapper(): AuthLoginLanguageResponseMapper {
    return AuthLoginLanguageResponseMapper.getInstance();
  }

  public static PlatformResponseMapper(): AuthLoginPlatformResponseMapper {
    return AuthLoginPlatformResponseMapper.getInstance();
  }

  public static CountryResponseMapper(): AuthLoginCountryResponseMapper {
    return AuthLoginCountryResponseMapper.getInstance();
  }

  public static CompanyResponseMapper(): AuthLoginCompanyResponseMapper {
    return AuthLoginCompanyResponseMapper.getInstance();
  }

  public static RolResponseMapper(): AuthLoginRolResponseMapper {
    return AuthLoginRolResponseMapper.getInstance();
  }

  public static PermissionResponseMapper(): AuthLoginPermissionResponseMapper {
    return AuthLoginPermissionResponseMapper.getInstance();
  }

  public static MenuResponseMapper(): AuthLoginMenuResponseMapper {
    return AuthLoginMenuResponseMapper.getInstance();
  }

  public static PlatformVariationsResponseMapper(): AuthLoginPlatformVariationsResponseMapper {
    return AuthLoginPlatformVariationsResponseMapper.getInstance();
  }
}