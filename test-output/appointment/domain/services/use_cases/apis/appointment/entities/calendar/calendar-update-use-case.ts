import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICalendarDTO, ICalendarUpdateDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import { InjectionPlatformEntitiesCalendarMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/entities/injection-appointment-entities-calendar-mapper";
import { InjectionPlatformEntitiesRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/entities/injection-appointment-entities-repository";

export class CalendarUpdateUseCase implements UseCase<ICalendarUpdateDTO, ICalendarDTO | null> {
  private static instance: CalendarUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.CalendarRepository();
  private mapper = InjectionPlatformEntitiesCalendarMapper.CalendarUpdateMapper();

  public static getInstance(): CalendarUpdateUseCase {
    if (!CalendarUpdateUseCase.instance)
      CalendarUpdateUseCase.instance = new CalendarUpdateUseCase();
    return CalendarUpdateUseCase.instance;
  }

  public async execute(params: ICalendarUpdateDTO, config?: IConfigDTO): Promise<ICalendarDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}