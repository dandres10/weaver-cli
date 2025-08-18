import { AuthRefreshTokenResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/auth-refresh-token-response-mapper";
import { PlatformConfigurationResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/platform-configuration-response-mapper";
import { UserLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/user-login-response-mapper";
import { CurrencyLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/currency-login-response-mapper";
import { LocationLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/location-login-response-mapper";
import { LanguageLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/language-login-response-mapper";
import { PlatformLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/platform-login-response-mapper";
import { CountryLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/country-login-response-mapper";
import { CompanyLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/company-login-response-mapper";
import { RolLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/rol-login-response-mapper";
import { PermissionLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/permission-login-response-mapper";
import { MenuLoginResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/menu-login-response-mapper";
import { PlatformVariationsResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/refresh_token/platform-variations-response-mapper";

export class InjectionPlatformBusinessAuthRefreshTokenMapper {
  public static AuthRefreshTokenResponseMapper(): AuthRefreshTokenResponseMapper {
    return AuthRefreshTokenResponseMapper.getInstance();
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