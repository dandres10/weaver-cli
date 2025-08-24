export interface IAvailabilityRescheduleAppointmentAppointmentCreatedRequestEntity {
  appointment_id: string;
  collaborator_id: string;
  user_location_rol_id: string;
  new_user_location_rol_id: string;
  services_id: string[];
  start: string;
  end: string;
}