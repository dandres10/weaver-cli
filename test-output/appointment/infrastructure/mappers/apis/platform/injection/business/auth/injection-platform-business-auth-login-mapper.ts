import { 
  AuthLoginRequestMapper,
  AuthLoginResponseMapper,
  AuthLoginPlatformConfigurationResponseMapper,
  AuthLoginUserResponseMapper,
  AuthLoginCurrencyResponseMapper,
  AuthLoginLocationResponseMapper,
  AuthLoginLanguageResponseMapper,
  AuthLoginPlatformResponseMapper,
  AuthLoginCountryResponseMapper,
  AuthLoginCompanyResponseMapper,
  AuthLoginRolResponseMapper,
  AuthLoginPermissionResponseMapper,
  AuthLoginMenuResponseMapper,
  AuthLoginPlatformVariationsResponseMapper
} from "@platform/infrastructure/mappers/apis/platform/business/auth";

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