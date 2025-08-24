import { 
  AvailabilityCancelAppointmentRequestMapper,
  AvailabilityCancelAppointmentResponseMapper
} from "@appointment/infrastructure/mappers/apis/appointment/business/availability";

export class InjectionPlatformBusinessAvailabilityCancelAppointmentMapper {
  public static AvailabilityCancelAppointmentRequestMapper(): AvailabilityCancelAppointmentRequestMapper {
    return AvailabilityCancelAppointmentRequestMapper.getInstance();
  }

  public static AvailabilityCancelAppointmentResponseMapper(): AvailabilityCancelAppointmentResponseMapper {
    return AvailabilityCancelAppointmentResponseMapper.getInstance();
  }
}