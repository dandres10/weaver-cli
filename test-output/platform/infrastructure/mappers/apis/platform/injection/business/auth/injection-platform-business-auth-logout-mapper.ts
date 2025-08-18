import { AuthLogoutResponseMapper } from "@platform/infrastructure/mappers/apis/platform/business/auth/logout/auth-logout-response-mapper";

export class InjectionPlatformBusinessAuthLogoutMapper {
  public static AuthLogoutResponseMapper(): AuthLogoutResponseMapper {
    return AuthLogoutResponseMapper.getInstance();
  }
}