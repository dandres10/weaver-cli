import { Mapper } from "@bus/core/classes";
import { IAvailabilityRescheduleAppointmentRequestDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityRescheduleAppointmentRequestEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";
import { InjectionAppointmentBusinessAvailabilityRescheduleAppointmentMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-reschedule-appointment-mapper";

export class AvailabilityRescheduleAppointmentRequestMapper extends Mapper<IAvailabilityRescheduleAppointmentRequestEntity, IAvailabilityRescheduleAppointmentRequestDTO> {

    private static instance: AvailabilityRescheduleAppointmentRequestMapper;
    private appointmentCreatedrequestMapper = InjectionAppointmentBusinessAvailabilityRescheduleAppointmentMapper.AppointmentCreatedRequestMapper()
    public constructor() { super(); }

    public static getInstance(): AvailabilityRescheduleAppointmentRequestMapper {
        if (!AvailabilityRescheduleAppointmentRequestMapper.instance)
            AvailabilityRescheduleAppointmentRequestMapper.instance = new AvailabilityRescheduleAppointmentRequestMapper();
        return AvailabilityRescheduleAppointmentRequestMapper.instance;
    }

    public mapFrom(param: IAvailabilityRescheduleAppointmentRequestEntity): IAvailabilityRescheduleAppointmentRequestDTO {
        return {
            clientId: param.client_id,
            locationId: param.location_id,
            currencyId: param.currency_id,
            today: param.today,
            appointmentsCreated: this.appointmentCreatedrequestMapper.mapFromList(param.appointments_created ?? [])
        }
    }

    public mapFromList(params: IAvailabilityRescheduleAppointmentRequestEntity[]): IAvailabilityRescheduleAppointmentRequestDTO[] {
        return params.map((param: IAvailabilityRescheduleAppointmentRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityRescheduleAppointmentRequestDTO): IAvailabilityRescheduleAppointmentRequestEntity {
        return {
            client_id: param.clientId,
            location_id: param.locationId,
            currency_id: param.currencyId,
            today: param.today,
            appointments_created: this.appointmentCreatedrequestMapper.mapToList(param.appointmentsCreated ?? [])
        }
    }

    public mapToList(params: IAvailabilityRescheduleAppointmentRequestDTO[]): IAvailabilityRescheduleAppointmentRequestEntity[] {
        return params.map((param: IAvailabilityRescheduleAppointmentRequestDTO) => {
            return this.mapTo(param);
        })
    }
}