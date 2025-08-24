import { 
  AvailabilityServicesByLocationRequestMapper,
  AvailabilityServicesByLocationResponseMapper
} from "@appointment/infrastructure/mappers/apis/appointment/business/availability";

export class InjectionAppointmentBusinessAvailabilityServicesByLocationMapper {
  public static AvailabilityServicesByLocationRequestMapper(): AvailabilityServicesByLocationRequestMapper {
    return AvailabilityServicesByLocationRequestMapper.getInstance();
  }

  public static AvailabilityServicesByLocationResponseMapper(): AvailabilityServicesByLocationResponseMapper {
    return AvailabilityServicesByLocationResponseMapper.getInstance();
  }
}