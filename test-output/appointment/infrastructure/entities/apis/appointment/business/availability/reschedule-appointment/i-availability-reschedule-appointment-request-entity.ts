import { IAvailabilityRescheduleAppointmentAppointmentCreatedRequestEntity } from "./i-availability-reschedule-appointment-appointment-created-request-entity";

export interface IAvailabilityRescheduleAppointmentRequestEntity {
  client_id: string;
  location_id: string;
  currency_id: string;
  today: string;
  appointments_created: IAvailabilityRescheduleAppointmentAppointmentCreatedRequestEntity[];
}