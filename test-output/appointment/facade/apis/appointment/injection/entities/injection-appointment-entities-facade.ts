import { ServiceCompanyFacade } from "@appointment/facade/apis/appointment/entities/service-company-facade";
import { CalendarFacade } from "@appointment/facade/apis/appointment/entities/calendar-facade";

export class InjectionAppointmentEntitiesFacade {
    public static ServiceCompanyFacade() { return ServiceCompanyFacade.getInstance(); }
    public static CalendarFacade() { return CalendarFacade.getInstance(); }
}


