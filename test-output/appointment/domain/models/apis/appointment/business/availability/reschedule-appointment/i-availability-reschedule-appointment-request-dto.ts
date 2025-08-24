import { IAvailabilityRescheduleAppointmentAppointmentCreatedRequestDTO } from "./i-availability-reschedule-appointment-appointment-created-request-dto";

export interface IAvailabilityRescheduleAppointmentRequestDTO {
  clientId: string;
  locationId: string;
  currencyId: string;
  today: string;
  appointmentsCreated: IAvailabilityRescheduleAppointmentAppointmentCreatedRequestDTO[];
}