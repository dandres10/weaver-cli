import { Mapper } from "@bus/core/classes";
import { IAvailabilityScheduleAppointmentAppointmentRequestDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityScheduleAppointmentAppointmentRequestEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityScheduleAppointmentAppointmentRequestMapper extends Mapper<IAvailabilityScheduleAppointmentAppointmentRequestEntity, IAvailabilityScheduleAppointmentAppointmentRequestDTO> {

    private static instance: AvailabilityScheduleAppointmentAppointmentRequestMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityScheduleAppointmentAppointmentRequestMapper {
        if (!AvailabilityScheduleAppointmentAppointmentRequestMapper.instance)
            AvailabilityScheduleAppointmentAppointmentRequestMapper.instance = new AvailabilityScheduleAppointmentAppointmentRequestMapper();
        return AvailabilityScheduleAppointmentAppointmentRequestMapper.instance;
    }

    public mapFrom(param: IAvailabilityScheduleAppointmentAppointmentRequestEntity): IAvailabilityScheduleAppointmentAppointmentRequestDTO {
        return {
            collaboratorId: param.collaborator_id,
            userLocationRolId: param.user_location_rol_id,
            servicesId: param.services_id,
            start: param.start,
            end: param.end
        }
    }

    public mapFromList(params: IAvailabilityScheduleAppointmentAppointmentRequestEntity[]): IAvailabilityScheduleAppointmentAppointmentRequestDTO[] {
        return params.map((param: IAvailabilityScheduleAppointmentAppointmentRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityScheduleAppointmentAppointmentRequestDTO): IAvailabilityScheduleAppointmentAppointmentRequestEntity {
        return {
            collaborator_id: param.collaboratorId,
            user_location_rol_id: param.userLocationRolId,
            services_id: param.servicesId,
            start: param.start,
            end: param.end
        }
    }

    public mapToList(params: IAvailabilityScheduleAppointmentAppointmentRequestDTO[]): IAvailabilityScheduleAppointmentAppointmentRequestEntity[] {
        return params.map((param: IAvailabilityScheduleAppointmentAppointmentRequestDTO) => {
            return this.mapTo(param);
        })
    }
}