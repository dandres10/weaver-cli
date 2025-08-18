import { AuthLoginRequestMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-request-mapper";
import { AuthLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/auth-login-response-mapper";
import { PlatformConfigurationResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/platform-configuration-response-mapper";
import { UserLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/user-login-response-mapper";
import { CurrencyLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/currency-login-response-mapper";
import { LocationLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/location-login-response-mapper";
import { LanguageLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/language-login-response-mapper";
import { PlatformLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/platform-login-response-mapper";
import { CountryLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/country-login-response-mapper";
import { CompanyLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/company-login-response-mapper";
import { RolLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/rol-login-response-mapper";
import { PermissionLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/permission-login-response-mapper";
import { MenuLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/menu-login-response-mapper";
import { PlatformVariationsResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/login/platform-variations-response-mapper";

export class InjectionPlatformBusinessAuthLoginMapper {
  public static AuthLoginRequestMapper(): AuthLoginRequestMapper {
    return AuthLoginRequestMapper.getInstance();
  }

  public static AuthLoginResponseMapper(): AuthLoginResponseMapper {
    return AuthLoginResponseMapper.getInstance();
  }

  public static PlatformConfigurationResponseMapper(): PlatformConfigurationResponseMapper {
    return PlatformConfigurationResponseMapper.getInstance();
  }

  public static UserLoginResponseMapper(): UserLoginResponseMapper {
    return UserLoginResponseMapper.getInstance();
  }

  public static CurrencyLoginResponseMapper(): CurrencyLoginResponseMapper {
    return CurrencyLoginResponseMapper.getInstance();
  }

  public static LocationLoginResponseMapper(): LocationLoginResponseMapper {
    return LocationLoginResponseMapper.getInstance();
  }

  public static LanguageLoginResponseMapper(): LanguageLoginResponseMapper {
    return LanguageLoginResponseMapper.getInstance();
  }

  public static PlatformLoginResponseMapper(): PlatformLoginResponseMapper {
    return PlatformLoginResponseMapper.getInstance();
  }

  public static CountryLoginResponseMapper(): CountryLoginResponseMapper {
    return CountryLoginResponseMapper.getInstance();
  }

  public static CompanyLoginResponseMapper(): CompanyLoginResponseMapper {
    return CompanyLoginResponseMapper.getInstance();
  }

  public static RolLoginResponseMapper(): RolLoginResponseMapper {
    return RolLoginResponseMapper.getInstance();
  }

  public static PermissionLoginResponseMapper(): PermissionLoginResponseMapper {
    return PermissionLoginResponseMapper.getInstance();
  }

  public static MenuLoginResponseMapper(): MenuLoginResponseMapper {
    return MenuLoginResponseMapper.getInstance();
  }

  public static PlatformVariationsResponseMapper(): PlatformVariationsResponseMapper {
    return PlatformVariationsResponseMapper.getInstance();
  }
}