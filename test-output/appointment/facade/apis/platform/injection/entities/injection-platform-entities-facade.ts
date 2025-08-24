import { LanguageFacade } from "@platform/facade/apis/platform/entities/language-facade";

export class InjectionPlatformEntitiesFacade {
    public static LanguageFacade() { return LanguageFacade.getInstance(); }
}


