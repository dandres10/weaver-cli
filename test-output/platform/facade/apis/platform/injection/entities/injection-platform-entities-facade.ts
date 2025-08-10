import { CountryFacade } from "@platform/facade/apis/platform/entities/country-facade";

export class InjectionPlatformEntitiesFacade {
    public static CountryFacade() { return CountryFacade.getInstance(); }
}


