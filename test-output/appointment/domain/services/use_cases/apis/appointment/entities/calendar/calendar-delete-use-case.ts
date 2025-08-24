import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICalendarDTO, ICalendarDeleteDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import { InjectionPlatformEntitiesCalendarMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/entities/injection-appointment-entities-calendar-mapper";
import { InjectionPlatformEntitiesRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/entities/injection-appointment-entities-repository";

export class CalendarDeleteUseCase implements UseCase<ICalendarDeleteDTO, ICalendarDTO | null> {
  private static instance: CalendarDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.CalendarRepository();
  private mapper = InjectionPlatformEntitiesCalendarMapper.CalendarDeleteMapper();

  public static getInstance(): CalendarDeleteUseCase {
    if (!CalendarDeleteUseCase.instance)
      CalendarDeleteUseCase.instance = new CalendarDeleteUseCase();
    return CalendarDeleteUseCase.instance;
  }

  public async execute(params: ICalendarDeleteDTO, config?: IConfigDTO): Promise<ICalendarDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}