import { IConfigDTO } from "@bus/core/interfaces";
import appointmentAxios from "@bus/core/axios/appointment-axios";
import { CONST_APPOINTMENT_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { ICalendarRepository } from "@appointment/domain/services/repositories/apis/appointment/entities/i-calendar-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ICalendarDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import { ICalendarDeleteEntity, ICalendarEntity, ICalendarReadEntity, ICalendarSaveEntity, ICalendarUpdateEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/calendar";
import { InjectionPlatformEntitiesCalendarMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/entities/injection-appointment-entities-calendar-mapper";

export class CalendarRepository extends ICalendarRepository {

    private static instance: CalendarRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly calendarEntityMapper = InjectionPlatformEntitiesCalendarMapper.CalendarEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): CalendarRepository {
        if (!CalendarRepository.instance)
            CalendarRepository.instance = new CalendarRepository();
        return CalendarRepository.instance;
    }

    public async read(
        params: ICalendarReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICalendarDTO | null> {
        if (config.loadService)
            return appointmentAxios
                .get(`${CONST_APPOINTMENT_API_ROUTES.CALENDAR}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICalendarEntity>(data);
                    if (entity)
                        return this.calendarEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: ICalendarSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICalendarDTO | null> {
        if (config.loadService)
            return appointmentAxios
                .post(CONST_APPOINTMENT_API_ROUTES.CALENDAR, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICalendarEntity>(data);
                    if (entity)
                        return this.calendarEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: ICalendarUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICalendarDTO | null> {
        if (config.loadService)
            return appointmentAxios
                .put(CONST_APPOINTMENT_API_ROUTES.CALENDAR, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICalendarEntity>(data);
                    if (entity)
                        return this.calendarEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: ICalendarDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICalendarDTO | null> {
        if (config.loadService)
            return appointmentAxios
                .delete(`${CONST_APPOINTMENT_API_ROUTES.CALENDAR}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICalendarEntity>(data);
                    if (entity)
                        return this.calendarEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICalendarDTO[] | null> {
        if (config.loadService)
            return appointmentAxios
                .post(CONST_APPOINTMENT_API_ROUTES.CALENDAR_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<ICalendarEntity[]>(data);
                    if (entities)
                        return this.calendarEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}