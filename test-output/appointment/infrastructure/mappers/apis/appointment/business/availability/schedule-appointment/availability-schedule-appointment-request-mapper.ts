import { Mapper } from "@bus/core/classes";
import { IAvailabilityScheduleAppointmentRequestDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityScheduleAppointmentRequestEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";
import { InjectionAppointmentBusinessAvailabilityScheduleAppointmentMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-schedule-appointment-mapper";

export class AvailabilityScheduleAppointmentRequestMapper extends Mapper<IAvailabilityScheduleAppointmentRequestEntity, IAvailabilityScheduleAppointmentRequestDTO> {

    private static instance: AvailabilityScheduleAppointmentRequestMapper;
    private appointmentrequestMapper = InjectionAppointmentBusinessAvailabilityScheduleAppointmentMapper.AppointmentRequestMapper()
    public constructor() { super(); }

    public static getInstance(): AvailabilityScheduleAppointmentRequestMapper {
        if (!AvailabilityScheduleAppointmentRequestMapper.instance)
            AvailabilityScheduleAppointmentRequestMapper.instance = new AvailabilityScheduleAppointmentRequestMapper();
        return AvailabilityScheduleAppointmentRequestMapper.instance;
    }

    public mapFrom(param: IAvailabilityScheduleAppointmentRequestEntity): IAvailabilityScheduleAppointmentRequestDTO {
        return {
            clientId: param.client_id,
            locationId: param.location_id,
            currencyId: param.currency_id,
            today: param.today,
            appointments: this.appointmentrequestMapper.mapFromList(param.appointments ?? [])
        }
    }

    public mapFromList(params: IAvailabilityScheduleAppointmentRequestEntity[]): IAvailabilityScheduleAppointmentRequestDTO[] {
        return params.map((param: IAvailabilityScheduleAppointmentRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityScheduleAppointmentRequestDTO): IAvailabilityScheduleAppointmentRequestEntity {
        return {
            client_id: param.clientId,
            location_id: param.locationId,
            currency_id: param.currencyId,
            today: param.today,
            appointments: this.appointmentrequestMapper.mapToList(param.appointments ?? [])
        }
    }

    public mapToList(params: IAvailabilityScheduleAppointmentRequestDTO[]): IAvailabilityScheduleAppointmentRequestEntity[] {
        return params.map((param: IAvailabilityScheduleAppointmentRequestDTO) => {
            return this.mapTo(param);
        })
    }
}