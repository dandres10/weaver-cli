import { UserFacade } from "@platform/facade/apis/platform/business/user-facade";
import { CompanyFacade } from "@platform/facade/apis/platform/business/company-facade";
import { AuthFacade } from "@platform/facade/apis/platform/business/auth-facade";

export class InjectionPlatformBusinessFacade {
    public static UserFacade() { return UserFacade.getInstance(); }
    public static CompanyFacade() { return CompanyFacade.getInstance(); }
    public static AuthFacade() { return AuthFacade.getInstance(); }
}