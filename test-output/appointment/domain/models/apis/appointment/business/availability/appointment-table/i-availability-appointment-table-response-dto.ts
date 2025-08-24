export interface IAvailabilityAppointmentTableResponseDTO {
  clientId: string;
  assignmentId: string;
  assignmentStatusId: string;
  assignmentStatusName: string;
  assignmentStatusCode: string;
  calendarId: string;
  userLocationRolId: string;
  appointmentId: string;
  appointmentStart: string;
  appointmentEnd: string;
  appointmentStatusId: string;
  appointmentStatusName: string;
  appointmentStatusCode: string;
  clientIdentification?: string;
  clientFirstName?: string;
  clientLastName?: string;
  clientPhone?: string;
  collaboratorIdentification?: string;
  collaboratorFirstName?: string;
  collaboratorLastName?: string;
  collaboratorPhone?: string;
}