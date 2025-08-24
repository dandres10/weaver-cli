import { Mapper } from "@bus/core/classes";
import { IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseMapper extends Mapper<IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseEntity, IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseDTO> {

    private static instance: AvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseMapper {
        if (!AvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseMapper.instance)
            AvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseMapper.instance = new AvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseMapper();
        return AvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseMapper.instance;
    }

    public mapFrom(param: IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseEntity): IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseDTO {
        return {
            serviceId: param.service_id,
            currencyId: param.currency_id,
            name: param.name,
            description: param.description,
            durationMinutes: param.duration_minutes
        }
    }

    public mapFromList(params: IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseEntity[]): IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseDTO[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseDTO): IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseEntity {
        return {
            service_id: param.serviceId,
            currency_id: param.currencyId,
            name: param.name,
            description: param.description,
            duration_minutes: param.durationMinutes
        }
    }

    public mapToList(params: IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseDTO[]): IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseEntity[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityAvailabilityServiceResponseDTO) => {
            return this.mapTo(param);
        })
    }
}