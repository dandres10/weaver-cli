import { IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseDTO } from "./i-availability-collaborators-availability-availability-service-response-dto";
import { IAvailabilityCollaboratorsAvailabilityRangesResponseDTO } from "./i-availability-collaborators-availability-ranges-response-dto";
import { IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseDTO } from "./i-availability-collaborators-availability-calculate-possible-assignment-hours-response-dto";

export interface IAvailabilityCollaboratorsAvailabilityCollaboratorResponseDTO {
  collaboratorId: string;
  clientId: string;
  userLocationRolId: string;
  name: string;
  takeAllServices: boolean;
  appointmentDuration: number;
  services?: IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseDTO[];
  scheduleAvailability?: IAvailabilityCollaboratorsAvailabilityRangesResponseDTO[];
  assignmentHours?: IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseDTO[];
}