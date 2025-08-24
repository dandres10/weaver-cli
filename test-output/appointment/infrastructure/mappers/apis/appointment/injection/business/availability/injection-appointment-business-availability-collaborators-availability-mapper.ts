import { 
  AvailabilityCollaboratorsAvailabilityRequestMapper,
  AvailabilityCollaboratorsAvailabilityResponseMapper,
  AvailabilityCollaboratorsAvailabilityCollaboratorResponseMapper,
  AvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseMapper,
  AvailabilityCollaboratorsAvailabilityRangesResponseMapper,
  AvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseMapper
} from "@appointment/infrastructure/mappers/apis/appointment/business/availability";

export class InjectionAppointmentBusinessAvailabilityCollaboratorsAvailabilityMapper {
  public static AvailabilityCollaboratorsAvailabilityRequestMapper(): AvailabilityCollaboratorsAvailabilityRequestMapper {
    return AvailabilityCollaboratorsAvailabilityRequestMapper.getInstance();
  }

  public static AvailabilityCollaboratorsAvailabilityResponseMapper(): AvailabilityCollaboratorsAvailabilityResponseMapper {
    return AvailabilityCollaboratorsAvailabilityResponseMapper.getInstance();
  }

  public static CollaboratorResponseMapper(): AvailabilityCollaboratorsAvailabilityCollaboratorResponseMapper {
    return AvailabilityCollaboratorsAvailabilityCollaboratorResponseMapper.getInstance();
  }

  public static AvailabilityServiceResponseMapper(): AvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseMapper {
    return AvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseMapper.getInstance();
  }

  public static RangesResponseMapper(): AvailabilityCollaboratorsAvailabilityRangesResponseMapper {
    return AvailabilityCollaboratorsAvailabilityRangesResponseMapper.getInstance();
  }

  public static CalculatePossibleAssignmentHoursResponseMapper(): AvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseMapper {
    return AvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseMapper.getInstance();
  }
}