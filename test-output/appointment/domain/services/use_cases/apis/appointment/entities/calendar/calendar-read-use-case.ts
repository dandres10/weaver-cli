import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICalendarDTO, ICalendarReadDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import { InjectionPlatformEntitiesCalendarMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/entities/injection-appointment-entities-calendar-mapper";
import { InjectionPlatformEntitiesRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/entities/injection-appointment-entities-repository";

export class CalendarReadUseCase implements UseCase<ICalendarReadDTO, ICalendarDTO | null> {
  private static instance: CalendarReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.CalendarRepository();
  private mapper = InjectionPlatformEntitiesCalendarMapper.CalendarReadMapper();

  public static getInstance(): CalendarReadUseCase {
    if (!CalendarReadUseCase.instance)
      CalendarReadUseCase.instance = new CalendarReadUseCase();
    return CalendarReadUseCase.instance;
  }

  public async execute(params: ICalendarReadDTO, config?: IConfigDTO): Promise<ICalendarDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}