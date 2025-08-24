import { Mapper } from "@bus/core/classes";
import { IAvailabilityCollaboratorsAvailabilityCollaboratorResponseDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityCollaboratorsAvailabilityCollaboratorResponseEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";
import { InjectionAppointmentBusinessAvailabilityCollaboratorsAvailabilityMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-collaborators-availability-mapper";

export class AvailabilityCollaboratorsAvailabilityCollaboratorResponseMapper extends Mapper<IAvailabilityCollaboratorsAvailabilityCollaboratorResponseEntity, IAvailabilityCollaboratorsAvailabilityCollaboratorResponseDTO> {

    private static instance: AvailabilityCollaboratorsAvailabilityCollaboratorResponseMapper;
    private availabilityServiceresponseMapper = InjectionAppointmentBusinessAvailabilityCollaboratorsAvailabilityMapper.AvailabilityServiceResponseMapper()
    private rangesresponseMapper = InjectionAppointmentBusinessAvailabilityCollaboratorsAvailabilityMapper.RangesResponseMapper()
    private calculatePossibleAssignmentHoursresponseMapper = InjectionAppointmentBusinessAvailabilityCollaboratorsAvailabilityMapper.CalculatePossibleAssignmentHoursResponseMapper()
    public constructor() { super(); }

    public static getInstance(): AvailabilityCollaboratorsAvailabilityCollaboratorResponseMapper {
        if (!AvailabilityCollaboratorsAvailabilityCollaboratorResponseMapper.instance)
            AvailabilityCollaboratorsAvailabilityCollaboratorResponseMapper.instance = new AvailabilityCollaboratorsAvailabilityCollaboratorResponseMapper();
        return AvailabilityCollaboratorsAvailabilityCollaboratorResponseMapper.instance;
    }

    public mapFrom(param: IAvailabilityCollaboratorsAvailabilityCollaboratorResponseEntity): IAvailabilityCollaboratorsAvailabilityCollaboratorResponseDTO {
        return {
            collaboratorId: param.collaborator_id,
            clientId: param.client_id,
            userLocationRolId: param.user_location_rol_id,
            name: param.name,
            takeAllServices: param.take_all_services,
            appointmentDuration: param.appointment_duration,
            services: this.availabilityServiceresponseMapper.mapFromList(param.services ?? []),
            scheduleAvailability: this.rangesresponseMapper.mapFromList(param.schedule_availability ?? []),
            assignmentHours: this.calculatePossibleAssignmentHoursresponseMapper.mapFromList(param.assignment_hours ?? [])
        }
    }

    public mapFromList(params: IAvailabilityCollaboratorsAvailabilityCollaboratorResponseEntity[]): IAvailabilityCollaboratorsAvailabilityCollaboratorResponseDTO[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityCollaboratorResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityCollaboratorsAvailabilityCollaboratorResponseDTO): IAvailabilityCollaboratorsAvailabilityCollaboratorResponseEntity {
        return {
            collaborator_id: param.collaboratorId,
            client_id: param.clientId,
            user_location_rol_id: param.userLocationRolId,
            name: param.name,
            take_all_services: param.takeAllServices,
            appointment_duration: param.appointmentDuration,
            services: this.availabilityServiceresponseMapper.mapToList(param.services ?? []),
            schedule_availability: this.rangesresponseMapper.mapToList(param.scheduleAvailability ?? []),
            assignment_hours: this.calculatePossibleAssignmentHoursresponseMapper.mapToList(param.assignmentHours ?? [])
        }
    }

    public mapToList(params: IAvailabilityCollaboratorsAvailabilityCollaboratorResponseDTO[]): IAvailabilityCollaboratorsAvailabilityCollaboratorResponseEntity[] {
        return params.map((param: IAvailabilityCollaboratorsAvailabilityCollaboratorResponseDTO) => {
            return this.mapTo(param);
        })
    }
}