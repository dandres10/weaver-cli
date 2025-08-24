import { Mapper } from "@bus/core/classes";
import { IAvailabilityServicesByLocationRequestDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityServicesByLocationRequestEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityServicesByLocationRequestMapper extends Mapper<IAvailabilityServicesByLocationRequestEntity, IAvailabilityServicesByLocationRequestDTO> {

    private static instance: AvailabilityServicesByLocationRequestMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityServicesByLocationRequestMapper {
        if (!AvailabilityServicesByLocationRequestMapper.instance)
            AvailabilityServicesByLocationRequestMapper.instance = new AvailabilityServicesByLocationRequestMapper();
        return AvailabilityServicesByLocationRequestMapper.instance;
    }

    public mapFrom(param: IAvailabilityServicesByLocationRequestEntity): IAvailabilityServicesByLocationRequestDTO {
        return {
            currencyId: param.currency_id,
            locationId: param.location_id
        }
    }

    public mapFromList(params: IAvailabilityServicesByLocationRequestEntity[]): IAvailabilityServicesByLocationRequestDTO[] {
        return params.map((param: IAvailabilityServicesByLocationRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityServicesByLocationRequestDTO): IAvailabilityServicesByLocationRequestEntity {
        return {
            currency_id: param.currencyId,
            location_id: param.locationId
        }
    }

    public mapToList(params: IAvailabilityServicesByLocationRequestDTO[]): IAvailabilityServicesByLocationRequestEntity[] {
        return params.map((param: IAvailabilityServicesByLocationRequestDTO) => {
            return this.mapTo(param);
        })
    }
}