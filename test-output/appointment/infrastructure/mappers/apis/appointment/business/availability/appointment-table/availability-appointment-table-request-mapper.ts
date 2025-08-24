import { Mapper } from "@bus/core/classes";
import { IAvailabilityAppointmentTableRequestDTO } from "@appointment/domain/models/apis/appointment/business/availability";
import { IAvailabilityAppointmentTableRequestEntity } from "@appointment/infrastructure/entities/apis/appointment/business/availability";
import { InjectionPlatformBusinessAvailabilityAppointmentTableMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/business/availability/injection-appointment-business-availability-appointment-table-mapper";

export class AvailabilityAppointmentTableRequestMapper extends Mapper<IAvailabilityAppointmentTableRequestEntity, IAvailabilityAppointmentTableRequestDTO> {

    private static instance: AvailabilityAppointmentTableRequestMapper;
    private filterManagerrequestMapper = InjectionPlatformBusinessAvailabilityAppointmentTableMapper.FilterManagerRequestMapper()
    public constructor() { super(); }

    public static getInstance(): AvailabilityAppointmentTableRequestMapper {
        if (!AvailabilityAppointmentTableRequestMapper.instance)
            AvailabilityAppointmentTableRequestMapper.instance = new AvailabilityAppointmentTableRequestMapper();
        return AvailabilityAppointmentTableRequestMapper.instance;
    }

    public mapFrom(param: IAvailabilityAppointmentTableRequestEntity): IAvailabilityAppointmentTableRequestDTO {
        return {
            skip: param.skip,
            limit: param.limit,
            allData: param.all_data,
            filters: this.filterManagerrequestMapper.mapFromList(param.filters ?? [])
        }
    }

    public mapFromList(params: IAvailabilityAppointmentTableRequestEntity[]): IAvailabilityAppointmentTableRequestDTO[] {
        return params.map((param: IAvailabilityAppointmentTableRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAvailabilityAppointmentTableRequestDTO): IAvailabilityAppointmentTableRequestEntity {
        return {
            skip: param.skip,
            limit: param.limit,
            all_data: param.allData,
            filters: this.filterManagerrequestMapper.mapToList(param.filters ?? [])
        }
    }

    public mapToList(params: IAvailabilityAppointmentTableRequestDTO[]): IAvailabilityAppointmentTableRequestEntity[] {
        return params.map((param: IAvailabilityAppointmentTableRequestDTO) => {
            return this.mapTo(param);
        })
    }
}