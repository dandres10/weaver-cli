export interface IAvailabilityAppointmentTableResponseEntity {
  client_id: string;
  assignment_id: string;
  assignment_status_id: string;
  assignment_status_name: string;
  assignment_status_code: string;
  calendar_id: string;
  user_location_rol_id: string;
  appointment_id: string;
  appointment_start: string;
  appointment_end: string;
  appointment_status_id: string;
  appointment_status_name: string;
  appointment_status_code: string;
  client_identification?: string;
  client_first_name?: string;
  client_last_name?: string;
  client_phone?: string;
  collaborator_identification?: string;
  collaborator_first_name?: string;
  collaborator_last_name?: string;
  collaborator_phone?: string;
}