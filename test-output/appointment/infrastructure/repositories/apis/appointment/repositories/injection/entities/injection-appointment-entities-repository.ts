import { ServiceCompanyRepository } from "../../entities/servicecompany/service-company-repository";
import { CalendarRepository } from "../../entities/calendar/calendar-repository";

export class InjectionAppointmentEntitiesRepository {
  public static ServiceCompanyRepository() { return ServiceCompanyRepository.getInstance(); }
  public static CalendarRepository() { return CalendarRepository.getInstance(); }
}


