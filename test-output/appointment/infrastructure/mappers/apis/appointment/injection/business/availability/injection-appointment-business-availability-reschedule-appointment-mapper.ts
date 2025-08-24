import { 
  AvailabilityRescheduleAppointmentRequestMapper,
  AvailabilityRescheduleAppointmentResponseMapper
} from "@appointment/infrastructure/mappers/apis/appointment/business/availability";

export class InjectionPlatformBusinessAvailabilityRescheduleAppointmentMapper {
  public static AvailabilityRescheduleAppointmentRequestMapper(): AvailabilityRescheduleAppointmentRequestMapper {
    return AvailabilityRescheduleAppointmentRequestMapper.getInstance();
  }

  public static AvailabilityRescheduleAppointmentResponseMapper(): AvailabilityRescheduleAppointmentResponseMapper {
    return AvailabilityRescheduleAppointmentResponseMapper.getInstance();
  }
}