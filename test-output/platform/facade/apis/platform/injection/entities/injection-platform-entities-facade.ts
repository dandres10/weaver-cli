import { MenuFacade } from "@bus/facade/apis/platform/entities/menu-facade";
import { UserFacade } from "@bus/facade/apis/platform/entities/user-facade";

export class InjectionPlatformEntitiesFacade {
    public static MenuFacade() { return MenuFacade.getInstance(); }
    public static UserFacade() { return UserFacade.getInstance(); }
}


