import { 
  AvailabilityAppointmentTableRequestMapper,
  AvailabilityAppointmentTableResponseMapper
} from "@appointment/infrastructure/mappers/apis/appointment/business/availability";

export class InjectionPlatformBusinessAvailabilityAppointmentTableMapper {
  public static AvailabilityAppointmentTableRequestMapper(): AvailabilityAppointmentTableRequestMapper {
    return AvailabilityAppointmentTableRequestMapper.getInstance();
  }

  public static AvailabilityAppointmentTableResponseMapper(): AvailabilityAppointmentTableResponseMapper {
    return AvailabilityAppointmentTableResponseMapper.getInstance();
  }
}