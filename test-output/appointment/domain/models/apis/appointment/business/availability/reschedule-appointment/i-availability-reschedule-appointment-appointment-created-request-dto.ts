export interface IAvailabilityRescheduleAppointmentAppointmentCreatedRequestDTO {
  appointmentId: string;
  collaboratorId: string;
  userLocationRolId: string;
  newUserLocationRolId: string;
  servicesId: string[];
  start: string;
  end: string;
}