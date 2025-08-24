import { ServiceCompanyFacade } from "@appointment/facade/apis/appointment/entities/service-company-facade";

export class InjectionAppointmentEntitiesFacade {
    public static ServiceCompanyFacade() { return ServiceCompanyFacade.getInstance(); }
}


