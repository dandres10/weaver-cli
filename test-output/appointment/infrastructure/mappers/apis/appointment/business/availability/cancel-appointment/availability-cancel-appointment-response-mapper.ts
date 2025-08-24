import { Mapper } from "@bus/core/classes";
import { IAvailabilityCancelAppointmentResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityCancelAppointmentResponseEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityCancelAppointmentResponseMapper extends Mapper<IAvailabilityCancelAppointmentResponseEntity, IAvailabilityCancelAppointmentResponseDTO> {

    private static instance: AvailabilityCancelAppointmentResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityCancelAppointmentResponseMapper {
        if (!AvailabilityCancelAppointmentResponseMapper.instance)
            AvailabilityCancelAppointmentResponseMapper.instance = new AvailabilityCancelAppointmentResponseMapper();
        return AvailabilityCancelAppointmentResponseMapper.instance;
    }

    public mapFrom(param: IAvailabilityCancelAppointmentResponseEntity): IAvailabilityCancelAppointmentResponseDTO {
        return {
            message: param.message
        }
    }

    public mapFromList(params: IAvailabilityCancelAppointmentResponseEntity[]): IAvailabilityCancelAppointmentResponseDTO[] {
        return params.map((param: IAvailabilityCancelAppointmentResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityCancelAppointmentResponseDTO): IAvailabilityCancelAppointmentResponseEntity {
        return {
            message: param.message
        }
    }

    public mapToList(params: IAvailabilityCancelAppointmentResponseDTO[]): IAvailabilityCancelAppointmentResponseEntity[] {
        return params.map((param: IAvailabilityCancelAppointmentResponseDTO) => {
            return this.mapTo(param);
        })
    }
}