import { IAvailabilityScheduleAppointmentAppointmentRequestDTO } from "./i-availability-schedule-appointment-appointment-request-dto";

export interface IAvailabilityScheduleAppointmentRequestDTO {
  clientId: string;
  locationId: string;
  currencyId: string;
  today: string;
  appointments: IAvailabilityScheduleAppointmentAppointmentRequestDTO[];
}