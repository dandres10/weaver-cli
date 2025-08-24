import { IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseEntity } from "./i-availability-collaborators-availability-availability-service-response-entity";
import { IAvailabilityCollaboratorsAvailabilityRangesResponseEntity } from "./i-availability-collaborators-availability-ranges-response-entity";
import { IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseEntity } from "./i-availability-collaborators-availability-calculate-possible-assignment-hours-response-entity";

export interface IAvailabilityCollaboratorsAvailabilityCollaboratorResponseEntity {
  collaborator_id: string;
  client_id: string;
  user_location_rol_id: string;
  name: string;
  take_all_services: boolean;
  appointment_duration: number;
  services?: IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseEntity[];
  schedule_availability?: IAvailabilityCollaboratorsAvailabilityRangesResponseEntity[];
  assignment_hours?: IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseEntity[];
}