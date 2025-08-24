import { 
  AuthLogoutResponseMapper
} from "@platform/infrastructure/mappers/apis/platform/business/auth";

export class InjectionPlatformBusinessAuthLogoutMapper {
  public static AuthLogoutResponseMapper(): AuthLogoutResponseMapper {
    return AuthLogoutResponseMapper.getInstance();
  }
}