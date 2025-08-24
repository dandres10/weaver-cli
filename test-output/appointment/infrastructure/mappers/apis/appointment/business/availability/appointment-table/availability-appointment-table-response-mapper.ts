import { Mapper } from "@bus/core/classes";
import { IAvailabilityAppointmentTableResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityAppointmentTableResponseEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";

export class AvailabilityAppointmentTableResponseMapper extends Mapper<IAvailabilityAppointmentTableResponseEntity, IAvailabilityAppointmentTableResponseDTO> {

    private static instance: AvailabilityAppointmentTableResponseMapper;

    public constructor() { super(); }

    public static getInstance(): AvailabilityAppointmentTableResponseMapper {
        if (!AvailabilityAppointmentTableResponseMapper.instance)
            AvailabilityAppointmentTableResponseMapper.instance = new AvailabilityAppointmentTableResponseMapper();
        return AvailabilityAppointmentTableResponseMapper.instance;
    }

    public mapFrom(param: IAvailabilityAppointmentTableResponseEntity): IAvailabilityAppointmentTableResponseDTO {
        return {
            clientId: param.client_id,
            assignmentId: param.assignment_id,
            assignmentStatusId: param.assignment_status_id,
            assignmentStatusName: param.assignment_status_name,
            assignmentStatusCode: param.assignment_status_code,
            calendarId: param.calendar_id,
            userLocationRolId: param.user_location_rol_id,
            appointmentId: param.appointment_id,
            appointmentStart: param.appointment_start,
            appointmentEnd: param.appointment_end,
            appointmentStatusId: param.appointment_status_id,
            appointmentStatusName: param.appointment_status_name,
            appointmentStatusCode: param.appointment_status_code,
            clientIdentification: param.client_identification,
            clientFirstName: param.client_first_name,
            clientLastName: param.client_last_name,
            clientPhone: param.client_phone,
            collaboratorIdentification: param.collaborator_identification,
            collaboratorFirstName: param.collaborator_first_name,
            collaboratorLastName: param.collaborator_last_name,
            collaboratorPhone: param.collaborator_phone
        }
    }

    public mapFromList(params: IAvailabilityAppointmentTableResponseEntity[]): IAvailabilityAppointmentTableResponseDTO[] {
        return params.map((param: IAvailabilityAppointmentTableResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityAppointmentTableResponseDTO): IAvailabilityAppointmentTableResponseEntity {
        return {
            client_id: param.clientId,
            assignment_id: param.assignmentId,
            assignment_status_id: param.assignmentStatusId,
            assignment_status_name: param.assignmentStatusName,
            assignment_status_code: param.assignmentStatusCode,
            calendar_id: param.calendarId,
            user_location_rol_id: param.userLocationRolId,
            appointment_id: param.appointmentId,
            appointment_start: param.appointmentStart,
            appointment_end: param.appointmentEnd,
            appointment_status_id: param.appointmentStatusId,
            appointment_status_name: param.appointmentStatusName,
            appointment_status_code: param.appointmentStatusCode,
            client_identification: param.clientIdentification,
            client_first_name: param.clientFirstName,
            client_last_name: param.clientLastName,
            client_phone: param.clientPhone,
            collaborator_identification: param.collaboratorIdentification,
            collaborator_first_name: param.collaboratorFirstName,
            collaborator_last_name: param.collaboratorLastName,
            collaborator_phone: param.collaboratorPhone
        }
    }

    public mapToList(params: IAvailabilityAppointmentTableResponseDTO[]): IAvailabilityAppointmentTableResponseEntity[] {
        return params.map((param: IAvailabilityAppointmentTableResponseDTO) => {
            return this.mapTo(param);
        })
    }
}