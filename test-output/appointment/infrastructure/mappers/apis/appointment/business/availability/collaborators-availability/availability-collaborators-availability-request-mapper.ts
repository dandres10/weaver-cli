import { Mapper } from "@bus/core/classes";
import { IAvailabilityCollaboratorsAvailabilityRequestDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityCollaboratorsAvailabilityRequestEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityCollaboratorsAvailabilityRequestMapper extends Mapper<IAvailabilityCollaboratorsAvailabilityRequestEntity, IAvailabilityCollaboratorsAvailabilityRequestDTO> {

    private static instance: AvailabilityCollaboratorsAvailabilityRequestMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityCollaboratorsAvailabilityRequestMapper {
        if (!AvailabilityCollaboratorsAvailabilityRequestMapper.instance)
            AvailabilityCollaboratorsAvailabilityRequestMapper.instance = new AvailabilityCollaboratorsAvailabilityRequestMapper();
        return AvailabilityCollaboratorsAvailabilityRequestMapper.instance;
    }

    public mapFrom(param: IAvailabilityCollaboratorsAvailabilityRequestEntity): IAvailabilityCollaboratorsAvailabilityRequestDTO {
        return {
            date: param.date,
            locationId: param.location_id,
            currencyId: param.currency_id,
            servicesId: param.services_id,
            clientId: param.client_id
        }
    }

    public mapFromList(params: IAvailabilityCollaboratorsAvailabilityRequestEntity[]): IAvailabilityCollaboratorsAvailabilityRequestDTO[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityCollaboratorsAvailabilityRequestDTO): IAvailabilityCollaboratorsAvailabilityRequestEntity {
        return {
            date: param.date,
            location_id: param.locationId,
            currency_id: param.currencyId,
            services_id: param.servicesId,
            client_id: param.clientId
        }
    }

    public mapToList(params: IAvailabilityCollaboratorsAvailabilityRequestDTO[]): IAvailabilityCollaboratorsAvailabilityRequestEntity[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityRequestDTO) => {
            return this.mapTo(param);
        })
    }
}