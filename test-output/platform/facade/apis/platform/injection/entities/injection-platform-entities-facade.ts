import { ApiTokenFacade } from "@platform/facade/apis/platform/entities/api-token-facade";
import { MenuPermissionFacade } from "@platform/facade/apis/platform/entities/menu-permission-facade";

export class InjectionPlatformEntitiesFacade {
    public static ApiTokenFacade() { return ApiTokenFacade.getInstance(); }
    public static MenuPermissionFacade() { return MenuPermissionFacade.getInstance(); }
}


