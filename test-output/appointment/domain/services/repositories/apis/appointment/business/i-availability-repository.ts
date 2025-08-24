import { IConfigDTO } from "@bus/core/interfaces";
import { 
  IAvailabilityServicesByLocationResponseDTO,
  IAvailabilityCollaboratorsAvailabilityResponseDTO,
  IAvailabilityScheduleAppointmentResponseDTO,
  IAvailabilityCancelAppointmentResponseDTO,
  IAvailabilityRescheduleAppointmentResponseDTO,
  IAvailabilityAppointmentTableResponseDTO
} from "@appointment/domain/models/apis/appointment/business/availability";
import {
  IAvailabilityServicesByLocationRequestEntity,
  IAvailabilityCollaboratorsAvailabilityRequestEntity,
  IAvailabilityScheduleAppointmentRequestEntity,
  IAvailabilityCancelAppointmentRequestEntity,
  IAvailabilityRescheduleAppointmentRequestEntity,
  IAvailabilityAppointmentTableRequestEntity
} from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export abstract class IAvailabilityRepository {
  abstract servicesByLocation(params: IAvailabilityServicesByLocationRequestEntity, config: IConfigDTO): Promise<IAvailabilityServicesByLocationResponseDTO | null>;
  abstract collaboratorsAvailability(params: IAvailabilityCollaboratorsAvailabilityRequestEntity, config: IConfigDTO): Promise<IAvailabilityCollaboratorsAvailabilityResponseDTO | null>;
  abstract scheduleAppointment(params: IAvailabilityScheduleAppointmentRequestEntity, config: IConfigDTO): Promise<IAvailabilityScheduleAppointmentResponseDTO | null>;
  abstract cancelAppointment(params: IAvailabilityCancelAppointmentRequestEntity, config: IConfigDTO): Promise<IAvailabilityCancelAppointmentResponseDTO | null>;
  abstract rescheduleAppointment(params: IAvailabilityRescheduleAppointmentRequestEntity, config: IConfigDTO): Promise<IAvailabilityRescheduleAppointmentResponseDTO | null>;
  abstract appointmentTable(params: IAvailabilityAppointmentTableRequestEntity, config: IConfigDTO): Promise<IAvailabilityAppointmentTableResponseDTO | null>;
}