import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICalendarDTO, ICalendarSaveDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import { InjectionPlatformEntitiesCalendarMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/entities/injection-appointment-entities-calendar-mapper";
import { InjectionPlatformEntitiesRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/entities/injection-appointment-entities-repository";

export class CalendarSaveUseCase implements UseCase<ICalendarSaveDTO, ICalendarDTO | null> {
  private static instance: CalendarSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.CalendarRepository();
  private mapper = InjectionPlatformEntitiesCalendarMapper.CalendarSaveMapper();

  public static getInstance(): CalendarSaveUseCase {
    if (!CalendarSaveUseCase.instance)
      CalendarSaveUseCase.instance = new CalendarSaveUseCase();
    return CalendarSaveUseCase.instance;
  }

  public async execute(params: ICalendarSaveDTO, config?: IConfigDTO): Promise<ICalendarDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}