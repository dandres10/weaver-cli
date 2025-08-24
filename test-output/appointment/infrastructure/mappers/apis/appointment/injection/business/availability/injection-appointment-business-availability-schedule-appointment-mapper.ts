import { 
  AvailabilityScheduleAppointmentRequestMapper,
  AvailabilityScheduleAppointmentResponseMapper
} from "@appointment/infrastructure/mappers/apis/appointment/business/availability";

export class InjectionPlatformBusinessAvailabilityScheduleAppointmentMapper {
  public static AvailabilityScheduleAppointmentRequestMapper(): AvailabilityScheduleAppointmentRequestMapper {
    return AvailabilityScheduleAppointmentRequestMapper.getInstance();
  }

  public static AvailabilityScheduleAppointmentResponseMapper(): AvailabilityScheduleAppointmentResponseMapper {
    return AvailabilityScheduleAppointmentResponseMapper.getInstance();
  }
}