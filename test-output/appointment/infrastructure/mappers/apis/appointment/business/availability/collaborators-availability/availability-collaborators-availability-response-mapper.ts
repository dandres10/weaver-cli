import { Mapper } from "@bus/core/classes";
import { IAvailabilityCollaboratorsAvailabilityResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityCollaboratorsAvailabilityResponseEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";
import { InjectionPlatformBusinessAvailabilityCollaboratorsAvailabilityMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-collaborators-availability-mapper";

export class AvailabilityCollaboratorsAvailabilityResponseMapper extends Mapper<IAvailabilityCollaboratorsAvailabilityResponseEntity, IAvailabilityCollaboratorsAvailabilityResponseDTO> {

    private static instance: AvailabilityCollaboratorsAvailabilityResponseMapper;
    private collaboratorresponseMapper = InjectionPlatformBusinessAvailabilityCollaboratorsAvailabilityMapper.CollaboratorResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AvailabilityCollaboratorsAvailabilityResponseMapper {
        if (!AvailabilityCollaboratorsAvailabilityResponseMapper.instance)
            AvailabilityCollaboratorsAvailabilityResponseMapper.instance = new AvailabilityCollaboratorsAvailabilityResponseMapper();
        return AvailabilityCollaboratorsAvailabilityResponseMapper.instance;
    }

    public mapFrom(param: IAvailabilityCollaboratorsAvailabilityResponseEntity): IAvailabilityCollaboratorsAvailabilityResponseDTO {
        return {
            collaborators: this.collaboratorresponseMapper.mapFromList(param.collaborators)
        }
    }

    public mapFromList(params: IAvailabilityCollaboratorsAvailabilityResponseEntity[]): IAvailabilityCollaboratorsAvailabilityResponseDTO[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityCollaboratorsAvailabilityResponseDTO): IAvailabilityCollaboratorsAvailabilityResponseEntity {
        return {
            collaborators: this.collaboratorresponseMapper.mapToList(param.collaborators)
        }
    }

    public mapToList(params: IAvailabilityCollaboratorsAvailabilityResponseDTO[]): IAvailabilityCollaboratorsAvailabilityResponseEntity[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityResponseDTO) => {
            return this.mapTo(param);
        })
    }
}