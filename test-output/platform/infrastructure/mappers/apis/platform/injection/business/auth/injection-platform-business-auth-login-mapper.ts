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

  public static AuthLoginPlatformConfigurationResponseMapper(): AuthLoginPlatformConfigurationResponseMapper {
    return AuthLoginPlatformConfigurationResponseMapper.getInstance();
  }

  public static AuthLoginUserResponseMapper(): AuthLoginUserResponseMapper {
    return AuthLoginUserResponseMapper.getInstance();
  }

  public static AuthLoginCurrencyResponseMapper(): AuthLoginCurrencyResponseMapper {
    return AuthLoginCurrencyResponseMapper.getInstance();
  }

  public static AuthLoginLocationResponseMapper(): AuthLoginLocationResponseMapper {
    return AuthLoginLocationResponseMapper.getInstance();
  }

  public static AuthLoginLanguageResponseMapper(): AuthLoginLanguageResponseMapper {
    return AuthLoginLanguageResponseMapper.getInstance();
  }

  public static AuthLoginPlatformResponseMapper(): AuthLoginPlatformResponseMapper {
    return AuthLoginPlatformResponseMapper.getInstance();
  }

  public static AuthLoginCountryResponseMapper(): AuthLoginCountryResponseMapper {
    return AuthLoginCountryResponseMapper.getInstance();
  }

  public static AuthLoginCompanyResponseMapper(): AuthLoginCompanyResponseMapper {
    return AuthLoginCompanyResponseMapper.getInstance();
  }

  public static AuthLoginRolResponseMapper(): AuthLoginRolResponseMapper {
    return AuthLoginRolResponseMapper.getInstance();
  }

  public static AuthLoginPermissionResponseMapper(): AuthLoginPermissionResponseMapper {
    return AuthLoginPermissionResponseMapper.getInstance();
  }

  public static AuthLoginMenuResponseMapper(): AuthLoginMenuResponseMapper {
    return AuthLoginMenuResponseMapper.getInstance();
  }

  public static AuthLoginPlatformVariationsResponseMapper(): AuthLoginPlatformVariationsResponseMapper {
    return AuthLoginPlatformVariationsResponseMapper.getInstance();
  }
}