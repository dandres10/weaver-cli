import { AuthCreateApiTokenRequestMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/create-api-token/auth-create-api-token-request-mapper";
import { AuthCreateApiTokenResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/create-api-token/auth-create-api-token-response-mapper";

export class InjectionPlatformBusinessAuthCreateApiTokenMapper {
  public static AuthCreateApiTokenRequestMapper(): AuthCreateApiTokenRequestMapper {
    return AuthCreateApiTokenRequestMapper.getInstance();
  }

  public static AuthCreateApiTokenResponseMapper(): AuthCreateApiTokenResponseMapper {
    return AuthCreateApiTokenResponseMapper.getInstance();
  }
}