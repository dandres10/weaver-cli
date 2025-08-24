import { Mapper } from "@bus/core/classes";
import { IAvailabilityRescheduleAppointmentResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityRescheduleAppointmentResponseEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityRescheduleAppointmentResponseMapper extends Mapper<IAvailabilityRescheduleAppointmentResponseEntity, IAvailabilityRescheduleAppointmentResponseDTO> {

    private static instance: AvailabilityRescheduleAppointmentResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityRescheduleAppointmentResponseMapper {
        if (!AvailabilityRescheduleAppointmentResponseMapper.instance)
            AvailabilityRescheduleAppointmentResponseMapper.instance = new AvailabilityRescheduleAppointmentResponseMapper();
        return AvailabilityRescheduleAppointmentResponseMapper.instance;
    }

    public mapFrom(param: IAvailabilityRescheduleAppointmentResponseEntity): IAvailabilityRescheduleAppointmentResponseDTO {
        return {
            message: param.message
        }
    }

    public mapFromList(params: IAvailabilityRescheduleAppointmentResponseEntity[]): IAvailabilityRescheduleAppointmentResponseDTO[] {
        return params.map((param: IAvailabilityRescheduleAppointmentResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityRescheduleAppointmentResponseDTO): IAvailabilityRescheduleAppointmentResponseEntity {
        return {
            message: param.message
        }
    }

    public mapToList(params: IAvailabilityRescheduleAppointmentResponseDTO[]): IAvailabilityRescheduleAppointmentResponseEntity[] {
        return params.map((param: IAvailabilityRescheduleAppointmentResponseDTO) => {
            return this.mapTo(param);
        })
    }
}