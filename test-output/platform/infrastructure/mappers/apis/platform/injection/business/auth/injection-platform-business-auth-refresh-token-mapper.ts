import { 
  AuthRefreshTokenResponseMapper,
  AuthRefreshTokenPlatformConfigurationResponseMapper,
  AuthRefreshTokenUserResponseMapper,
  AuthRefreshTokenCurrencyResponseMapper,
  AuthRefreshTokenLocationResponseMapper,
  AuthRefreshTokenLanguageResponseMapper,
  AuthRefreshTokenPlatformResponseMapper,
  AuthRefreshTokenCountryResponseMapper,
  AuthRefreshTokenCompanyResponseMapper,
  AuthRefreshTokenRolResponseMapper,
  AuthRefreshTokenPermissionResponseMapper,
  AuthRefreshTokenMenuResponseMapper,
  AuthRefreshTokenPlatformVariationsResponseMapper
} from "@platform/infrastructure/mappers/apis/platform/business/auth";

export class InjectionPlatformBusinessAuthRefreshTokenMapper {
  public static AuthRefreshTokenResponseMapper(): AuthRefreshTokenResponseMapper {
    return AuthRefreshTokenResponseMapper.getInstance();
  }

  public static PlatformConfigurationResponseMapper(): AuthRefreshTokenPlatformConfigurationResponseMapper {
    return AuthRefreshTokenPlatformConfigurationResponseMapper.getInstance();
  }

  public static UserResponseMapper(): AuthRefreshTokenUserResponseMapper {
    return AuthRefreshTokenUserResponseMapper.getInstance();
  }

  public static CurrencyResponseMapper(): AuthRefreshTokenCurrencyResponseMapper {
    return AuthRefreshTokenCurrencyResponseMapper.getInstance();
  }

  public static LocationResponseMapper(): AuthRefreshTokenLocationResponseMapper {
    return AuthRefreshTokenLocationResponseMapper.getInstance();
  }

  public static LanguageResponseMapper(): AuthRefreshTokenLanguageResponseMapper {
    return AuthRefreshTokenLanguageResponseMapper.getInstance();
  }

  public static PlatformResponseMapper(): AuthRefreshTokenPlatformResponseMapper {
    return AuthRefreshTokenPlatformResponseMapper.getInstance();
  }

  public static CountryResponseMapper(): AuthRefreshTokenCountryResponseMapper {
    return AuthRefreshTokenCountryResponseMapper.getInstance();
  }

  public static CompanyResponseMapper(): AuthRefreshTokenCompanyResponseMapper {
    return AuthRefreshTokenCompanyResponseMapper.getInstance();
  }

  public static RolResponseMapper(): AuthRefreshTokenRolResponseMapper {
    return AuthRefreshTokenRolResponseMapper.getInstance();
  }

  public static PermissionResponseMapper(): AuthRefreshTokenPermissionResponseMapper {
    return AuthRefreshTokenPermissionResponseMapper.getInstance();
  }

  public static MenuResponseMapper(): AuthRefreshTokenMenuResponseMapper {
    return AuthRefreshTokenMenuResponseMapper.getInstance();
  }

  public static PlatformVariationsResponseMapper(): AuthRefreshTokenPlatformVariationsResponseMapper {
    return AuthRefreshTokenPlatformVariationsResponseMapper.getInstance();
  }
}