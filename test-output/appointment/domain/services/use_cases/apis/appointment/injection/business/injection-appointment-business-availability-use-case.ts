import { AvailabilityServicesByLocationUseCase } from "@appointment/domain/services/use_cases/apis/appointment/business/availability/availability-services-by-location-use-case";
import { AvailabilityCollaboratorsAvailabilityUseCase } from "@appointment/domain/services/use_cases/apis/appointment/business/availability/availability-collaborators-availability-use-case";
import { AvailabilityScheduleAppointmentUseCase } from "@appointment/domain/services/use_cases/apis/appointment/business/availability/availability-schedule-appointment-use-case";
import { AvailabilityCancelAppointmentUseCase } from "@appointment/domain/services/use_cases/apis/appointment/business/availability/availability-cancel-appointment-use-case";
import { AvailabilityRescheduleAppointmentUseCase } from "@appointment/domain/services/use_cases/apis/appointment/business/availability/availability-reschedule-appointment-use-case";
import { AvailabilityAppointmentTableUseCase } from "@appointment/domain/services/use_cases/apis/appointment/business/availability/availability-appointment-table-use-case";

export class InjectionAppointmentBusinessAvailabilityUseCase {
  public static AvailabilityServicesByLocationUseCase(): AvailabilityServicesByLocationUseCase {
    return AvailabilityServicesByLocationUseCase.getInstance();
  }

  public static AvailabilityCollaboratorsAvailabilityUseCase(): AvailabilityCollaboratorsAvailabilityUseCase {
    return AvailabilityCollaboratorsAvailabilityUseCase.getInstance();
  }

  public static AvailabilityScheduleAppointmentUseCase(): AvailabilityScheduleAppointmentUseCase {
    return AvailabilityScheduleAppointmentUseCase.getInstance();
  }

  public static AvailabilityCancelAppointmentUseCase(): AvailabilityCancelAppointmentUseCase {
    return AvailabilityCancelAppointmentUseCase.getInstance();
  }

  public static AvailabilityRescheduleAppointmentUseCase(): AvailabilityRescheduleAppointmentUseCase {
    return AvailabilityRescheduleAppointmentUseCase.getInstance();
  }

  public static AvailabilityAppointmentTableUseCase(): AvailabilityAppointmentTableUseCase {
    return AvailabilityAppointmentTableUseCase.getInstance();
  }
}