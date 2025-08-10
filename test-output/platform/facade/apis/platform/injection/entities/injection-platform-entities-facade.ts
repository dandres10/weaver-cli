import { CompanyFacade } from "@platform/facade/apis/platform/entities/company-facade";

export class InjectionPlatformEntitiesFacade {
    public static CompanyFacade() { return CompanyFacade.getInstance(); }
}


