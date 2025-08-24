import { 
  AvailabilityRescheduleAppointmentRequestMapper,
  AvailabilityRescheduleAppointmentResponseMapper,
  AvailabilityRescheduleAppointmentAppointmentCreatedRequestMapper
} from "@appointment/infrastructure/mappers/apis/appointment/business/availability";

export class InjectionAppointmentBusinessAvailabilityRescheduleAppointmentMapper {
  public static AvailabilityRescheduleAppointmentRequestMapper(): AvailabilityRescheduleAppointmentRequestMapper {
    return AvailabilityRescheduleAppointmentRequestMapper.getInstance();
  }

  public static AvailabilityRescheduleAppointmentResponseMapper(): AvailabilityRescheduleAppointmentResponseMapper {
    return AvailabilityRescheduleAppointmentResponseMapper.getInstance();
  }

  public static AppointmentCreatedRequestMapper(): AvailabilityRescheduleAppointmentAppointmentCreatedRequestMapper {
    return AvailabilityRescheduleAppointmentAppointmentCreatedRequestMapper.getInstance();
  }
}