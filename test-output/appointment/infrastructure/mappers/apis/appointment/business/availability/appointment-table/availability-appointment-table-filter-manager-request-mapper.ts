import { Mapper } from "@bus/core/classes";
import { IAvailabilityAppointmentTableFilterManagerRequestDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityAppointmentTableFilterManagerRequestEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityAppointmentTableFilterManagerRequestMapper extends Mapper<IAvailabilityAppointmentTableFilterManagerRequestEntity, IAvailabilityAppointmentTableFilterManagerRequestDTO> {

    private static instance: AvailabilityAppointmentTableFilterManagerRequestMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityAppointmentTableFilterManagerRequestMapper {
        if (!AvailabilityAppointmentTableFilterManagerRequestMapper.instance)
            AvailabilityAppointmentTableFilterManagerRequestMapper.instance = new AvailabilityAppointmentTableFilterManagerRequestMapper();
        return AvailabilityAppointmentTableFilterManagerRequestMapper.instance;
    }

    public mapFrom(param: IAvailabilityAppointmentTableFilterManagerRequestEntity): IAvailabilityAppointmentTableFilterManagerRequestDTO {
        return {
            field: param.field,
            condition: param.condition,
            value: param.value,
            group: param.group,
            initialValue: param.initialValue,
            finalValue: param.finalValue
        }
    }

    public mapFromList(params: IAvailabilityAppointmentTableFilterManagerRequestEntity[]): IAvailabilityAppointmentTableFilterManagerRequestDTO[] {
        return params.map((param: IAvailabilityAppointmentTableFilterManagerRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityAppointmentTableFilterManagerRequestDTO): IAvailabilityAppointmentTableFilterManagerRequestEntity {
        return {
            field: param.field,
            condition: param.condition,
            value: param.value,
            group: param.group,
            initialValue: param.initialValue,
            finalValue: param.finalValue
        }
    }

    public mapToList(params: IAvailabilityAppointmentTableFilterManagerRequestDTO[]): IAvailabilityAppointmentTableFilterManagerRequestEntity[] {
        return params.map((param: IAvailabilityAppointmentTableFilterManagerRequestDTO) => {
            return this.mapTo(param);
        })
    }
}