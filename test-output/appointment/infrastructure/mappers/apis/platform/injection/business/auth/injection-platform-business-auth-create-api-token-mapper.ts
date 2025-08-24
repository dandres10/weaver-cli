import { 
  AuthCreateApiTokenRequestMapper,
  AuthCreateApiTokenResponseMapper
} from "@platform/infrastructure/mappers/apis/platform/business/auth";

export class InjectionPlatformBusinessAuthCreateApiTokenMapper {
  public static AuthCreateApiTokenRequestMapper(): AuthCreateApiTokenRequestMapper {
    return AuthCreateApiTokenRequestMapper.getInstance();
  }

  public static AuthCreateApiTokenResponseMapper(): AuthCreateApiTokenResponseMapper {
    return AuthCreateApiTokenResponseMapper.getInstance();
  }
}