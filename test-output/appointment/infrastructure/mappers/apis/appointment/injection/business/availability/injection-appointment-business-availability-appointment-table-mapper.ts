import { 
  AvailabilityAppointmentTableRequestMapper,
  AvailabilityAppointmentTableResponseMapper,
  AvailabilityAppointmentTableFilterManagerRequestMapper
} from "@appointment/infrastructure/mappers/apis/appointment/business/availability";

export class InjectionPlatformBusinessAvailabilityAppointmentTableMapper {
  public static AvailabilityAppointmentTableRequestMapper(): AvailabilityAppointmentTableRequestMapper {
    return AvailabilityAppointmentTableRequestMapper.getInstance();
  }

  public static AvailabilityAppointmentTableResponseMapper(): AvailabilityAppointmentTableResponseMapper {
    return AvailabilityAppointmentTableResponseMapper.getInstance();
  }

  public static FilterManagerRequestMapper(): AvailabilityAppointmentTableFilterManagerRequestMapper {
    return AvailabilityAppointmentTableFilterManagerRequestMapper.getInstance();
  }
}