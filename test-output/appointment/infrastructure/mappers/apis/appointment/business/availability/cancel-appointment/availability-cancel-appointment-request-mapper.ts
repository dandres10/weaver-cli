import { Mapper } from "@bus/core/classes";
import { IAvailabilityCancelAppointmentRequestDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityCancelAppointmentRequestEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityCancelAppointmentRequestMapper extends Mapper<IAvailabilityCancelAppointmentRequestEntity, IAvailabilityCancelAppointmentRequestDTO> {

    private static instance: AvailabilityCancelAppointmentRequestMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityCancelAppointmentRequestMapper {
        if (!AvailabilityCancelAppointmentRequestMapper.instance)
            AvailabilityCancelAppointmentRequestMapper.instance = new AvailabilityCancelAppointmentRequestMapper();
        return AvailabilityCancelAppointmentRequestMapper.instance;
    }

    public mapFrom(param: IAvailabilityCancelAppointmentRequestEntity): IAvailabilityCancelAppointmentRequestDTO {
        return {
            appointmentId: param.appointment_id
        }
    }

    public mapFromList(params: IAvailabilityCancelAppointmentRequestEntity[]): IAvailabilityCancelAppointmentRequestDTO[] {
        return params.map((param: IAvailabilityCancelAppointmentRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityCancelAppointmentRequestDTO): IAvailabilityCancelAppointmentRequestEntity {
        return {
            appointment_id: param.appointmentId
        }
    }

    public mapToList(params: IAvailabilityCancelAppointmentRequestDTO[]): IAvailabilityCancelAppointmentRequestEntity[] {
        return params.map((param: IAvailabilityCancelAppointmentRequestDTO) => {
            return this.mapTo(param);
        })
    }
}