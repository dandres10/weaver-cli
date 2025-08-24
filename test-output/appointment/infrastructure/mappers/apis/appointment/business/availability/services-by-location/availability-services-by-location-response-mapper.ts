import { Mapper } from "@bus/core/classes";
import { IAvailabilityServicesByLocationResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityServicesByLocationResponseEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityServicesByLocationResponseMapper extends Mapper<IAvailabilityServicesByLocationResponseEntity, IAvailabilityServicesByLocationResponseDTO> {

    private static instance: AvailabilityServicesByLocationResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityServicesByLocationResponseMapper {
        if (!AvailabilityServicesByLocationResponseMapper.instance)
            AvailabilityServicesByLocationResponseMapper.instance = new AvailabilityServicesByLocationResponseMapper();
        return AvailabilityServicesByLocationResponseMapper.instance;
    }

    public mapFrom(param: IAvailabilityServicesByLocationResponseEntity): IAvailabilityServicesByLocationResponseDTO {
        return {
            id: param.id,
            currencyId: param.currency_id,
            name: param.name,
            description: param.description,
            state: param.state,
            durationMinutes: param.duration_minutes
        }
    }

    public mapFromList(params: IAvailabilityServicesByLocationResponseEntity[]): IAvailabilityServicesByLocationResponseDTO[] {
        return params.map((param: IAvailabilityServicesByLocationResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityServicesByLocationResponseDTO): IAvailabilityServicesByLocationResponseEntity {
        return {
            id: param.id,
            currency_id: param.currencyId,
            name: param.name,
            description: param.description,
            state: param.state,
            duration_minutes: param.durationMinutes
        }
    }

    public mapToList(params: IAvailabilityServicesByLocationResponseDTO[]): IAvailabilityServicesByLocationResponseEntity[] {
        return params.map((param: IAvailabilityServicesByLocationResponseDTO) => {
            return this.mapTo(param);
        })
    }
}