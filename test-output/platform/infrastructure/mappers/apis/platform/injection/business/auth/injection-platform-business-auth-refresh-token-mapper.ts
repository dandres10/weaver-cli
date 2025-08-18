import { 
  AuthRefreshTokenResponseMapper,
  AuthRefreshTokenPlatformConfigurationResponseMapper,
  AuthRefreshTokenUserLoginResponseMapper,
  AuthRefreshTokenCurrencyLoginResponseMapper,
  AuthRefreshTokenLocationLoginResponseMapper,
  AuthRefreshTokenLanguageLoginResponseMapper,
  AuthRefreshTokenPlatformLoginResponseMapper,
  AuthRefreshTokenCountryLoginResponseMapper,
  AuthRefreshTokenCompanyLoginResponseMapper,
  AuthRefreshTokenRolLoginResponseMapper,
  AuthRefreshTokenPermissionLoginResponseMapper,
  AuthRefreshTokenMenuLoginResponseMapper,
  AuthRefreshTokenPlatformVariationsResponseMapper
} from "@platform/infrastructure/mappers/apis/platform/business/auth";

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