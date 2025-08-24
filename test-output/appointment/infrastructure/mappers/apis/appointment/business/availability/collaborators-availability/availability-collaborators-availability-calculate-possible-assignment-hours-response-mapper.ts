import { Mapper } from "@bus/core/classes";
import { IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseMapper extends Mapper<IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseEntity, IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseDTO> {

    private static instance: AvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseMapper {
        if (!AvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseMapper.instance)
            AvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseMapper.instance = new AvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseMapper();
        return AvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseMapper.instance;
    }

    public mapFrom(param: IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseEntity): IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseDTO {
        return {
            start: param.start,
            end: param.end
        }
    }

    public mapFromList(params: IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseEntity[]): IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseDTO[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseDTO): IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseEntity {
        return {
            start: param.start,
            end: param.end
        }
    }

    public mapToList(params: IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseDTO[]): IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseEntity[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityCalculatePossibleAssignmentHoursResponseDTO) => {
            return this.mapTo(param);
        })
    }
}