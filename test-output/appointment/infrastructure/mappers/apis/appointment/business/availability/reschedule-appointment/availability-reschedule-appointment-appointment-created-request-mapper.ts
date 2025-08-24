import { Mapper } from "@bus/core/classes";
import { IAvailabilityRescheduleAppointmentAppointmentCreatedRequestDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityRescheduleAppointmentAppointmentCreatedRequestEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityRescheduleAppointmentAppointmentCreatedRequestMapper extends Mapper<IAvailabilityRescheduleAppointmentAppointmentCreatedRequestEntity, IAvailabilityRescheduleAppointmentAppointmentCreatedRequestDTO> {

    private static instance: AvailabilityRescheduleAppointmentAppointmentCreatedRequestMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityRescheduleAppointmentAppointmentCreatedRequestMapper {
        if (!AvailabilityRescheduleAppointmentAppointmentCreatedRequestMapper.instance)
            AvailabilityRescheduleAppointmentAppointmentCreatedRequestMapper.instance = new AvailabilityRescheduleAppointmentAppointmentCreatedRequestMapper();
        return AvailabilityRescheduleAppointmentAppointmentCreatedRequestMapper.instance;
    }

    public mapFrom(param: IAvailabilityRescheduleAppointmentAppointmentCreatedRequestEntity): IAvailabilityRescheduleAppointmentAppointmentCreatedRequestDTO {
        return {
            appointmentId: param.appointment_id,
            collaboratorId: param.collaborator_id,
            userLocationRolId: param.user_location_rol_id,
            newUserLocationRolId: param.new_user_location_rol_id,
            servicesId: param.services_id,
            start: param.start,
            end: param.end
        }
    }

    public mapFromList(params: IAvailabilityRescheduleAppointmentAppointmentCreatedRequestEntity[]): IAvailabilityRescheduleAppointmentAppointmentCreatedRequestDTO[] {
        return params.map((param: IAvailabilityRescheduleAppointmentAppointmentCreatedRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityRescheduleAppointmentAppointmentCreatedRequestDTO): IAvailabilityRescheduleAppointmentAppointmentCreatedRequestEntity {
        return {
            appointment_id: param.appointmentId,
            collaborator_id: param.collaboratorId,
            user_location_rol_id: param.userLocationRolId,
            new_user_location_rol_id: param.newUserLocationRolId,
            services_id: param.servicesId,
            start: param.start,
            end: param.end
        }
    }

    public mapToList(params: IAvailabilityRescheduleAppointmentAppointmentCreatedRequestDTO[]): IAvailabilityRescheduleAppointmentAppointmentCreatedRequestEntity[] {
        return params.map((param: IAvailabilityRescheduleAppointmentAppointmentCreatedRequestDTO) => {
            return this.mapTo(param);
        })
    }
}