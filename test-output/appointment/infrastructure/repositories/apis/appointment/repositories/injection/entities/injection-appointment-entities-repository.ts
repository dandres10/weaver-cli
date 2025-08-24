import { ServiceCompanyRepository } from "../../entities/servicecompany/service-company-repository";

export class InjectionAppointmentEntitiesRepository {
  public static ServiceCompanyRepository() { return ServiceCompanyRepository.getInstance(); }
}


