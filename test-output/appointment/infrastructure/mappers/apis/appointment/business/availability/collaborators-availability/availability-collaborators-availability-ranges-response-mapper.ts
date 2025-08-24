import { Mapper } from "@bus/core/classes";
import { IAvailabilityCollaboratorsAvailabilityRangesResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityCollaboratorsAvailabilityRangesResponseEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityCollaboratorsAvailabilityRangesResponseMapper extends Mapper<IAvailabilityCollaboratorsAvailabilityRangesResponseEntity, IAvailabilityCollaboratorsAvailabilityRangesResponseDTO> {

    private static instance: AvailabilityCollaboratorsAvailabilityRangesResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityCollaboratorsAvailabilityRangesResponseMapper {
        if (!AvailabilityCollaboratorsAvailabilityRangesResponseMapper.instance)
            AvailabilityCollaboratorsAvailabilityRangesResponseMapper.instance = new AvailabilityCollaboratorsAvailabilityRangesResponseMapper();
        return AvailabilityCollaboratorsAvailabilityRangesResponseMapper.instance;
    }

    public mapFrom(param: IAvailabilityCollaboratorsAvailabilityRangesResponseEntity): IAvailabilityCollaboratorsAvailabilityRangesResponseDTO {
        return {
            start: param.start,
            end: param.end
        }
    }

    public mapFromList(params: IAvailabilityCollaboratorsAvailabilityRangesResponseEntity[]): IAvailabilityCollaboratorsAvailabilityRangesResponseDTO[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityRangesResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityCollaboratorsAvailabilityRangesResponseDTO): IAvailabilityCollaboratorsAvailabilityRangesResponseEntity {
        return {
            start: param.start,
            end: param.end
        }
    }

    public mapToList(params: IAvailabilityCollaboratorsAvailabilityRangesResponseDTO[]): IAvailabilityCollaboratorsAvailabilityRangesResponseEntity[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityRangesResponseDTO) => {
            return this.mapTo(param);
        })
    }
}