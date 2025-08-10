import { ApiTokenRepository } from "../../entities/apitoken";
import { MenuPermissionRepository } from "../../entities/menupermission";

export class InjectionPlatformEntitiesRepository {
  public static ApiTokenRepository() { return ApiTokenRepository.getInstance(); }
  public static MenuPermissionRepository() { return MenuPermissionRepository.getInstance(); }
}


