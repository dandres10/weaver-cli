import { Mapper } from "@bus/core/classes";
import { IAvailabilityScheduleAppointmentResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityScheduleAppointmentResponseEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityScheduleAppointmentResponseMapper extends Mapper<IAvailabilityScheduleAppointmentResponseEntity, IAvailabilityScheduleAppointmentResponseDTO> {

    private static instance: AvailabilityScheduleAppointmentResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityScheduleAppointmentResponseMapper {
        if (!AvailabilityScheduleAppointmentResponseMapper.instance)
            AvailabilityScheduleAppointmentResponseMapper.instance = new AvailabilityScheduleAppointmentResponseMapper();
        return AvailabilityScheduleAppointmentResponseMapper.instance;
    }

    public mapFrom(param: IAvailabilityScheduleAppointmentResponseEntity): IAvailabilityScheduleAppointmentResponseDTO {
        return {
            message: param.message
        }
    }

    public mapFromList(params: IAvailabilityScheduleAppointmentResponseEntity[]): IAvailabilityScheduleAppointmentResponseDTO[] {
        return params.map((param: IAvailabilityScheduleAppointmentResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityScheduleAppointmentResponseDTO): IAvailabilityScheduleAppointmentResponseEntity {
        return {
            message: param.message
        }
    }

    public mapToList(params: IAvailabilityScheduleAppointmentResponseDTO[]): IAvailabilityScheduleAppointmentResponseEntity[] {
        return params.map((param: IAvailabilityScheduleAppointmentResponseDTO) => {
            return this.mapTo(param);
        })
    }
}