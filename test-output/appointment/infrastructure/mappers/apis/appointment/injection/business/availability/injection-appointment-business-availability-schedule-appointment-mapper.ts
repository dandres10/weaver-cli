import { 
  AvailabilityScheduleAppointmentRequestMapper,
  AvailabilityScheduleAppointmentResponseMapper,
  AvailabilityScheduleAppointmentAppointmentRequestMapper
} from "@appointment/infrastructure/mappers/apis/appointment/business/availability";

export class InjectionAppointmentBusinessAvailabilityScheduleAppointmentMapper {
  public static AvailabilityScheduleAppointmentRequestMapper(): AvailabilityScheduleAppointmentRequestMapper {
    return AvailabilityScheduleAppointmentRequestMapper.getInstance();
  }

  public static AvailabilityScheduleAppointmentResponseMapper(): AvailabilityScheduleAppointmentResponseMapper {
    return AvailabilityScheduleAppointmentResponseMapper.getInstance();
  }

  public static AppointmentRequestMapper(): AvailabilityScheduleAppointmentAppointmentRequestMapper {
    return AvailabilityScheduleAppointmentAppointmentRequestMapper.getInstance();
  }
}