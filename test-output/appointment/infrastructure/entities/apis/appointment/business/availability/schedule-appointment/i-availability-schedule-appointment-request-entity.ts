import { IAvailabilityScheduleAppointmentAppointmentRequestEntity } from "./i-availability-schedule-appointment-appointment-request-entity";

export interface IAvailabilityScheduleAppointmentRequestEntity {
  client_id: string;
  location_id: string;
  currency_id: string;
  today: string;
  appointments: IAvailabilityScheduleAppointmentAppointmentRequestEntity[];
}