import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICalendarDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import { InjectionPlatformEntitiesRepository } from "@appointment/infrastructure/repositories/apis/appointment/repositories/injection/entities/injection-appointment-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class CalendarListUseCase implements UseCase<IPaginationBackendDTO, ICalendarDTO[] | null> {
  private static instance: CalendarListUseCase;
  private repository = InjectionPlatformEntitiesRepository.CalendarRepository();

  public static getInstance(): CalendarListUseCase {
    if (!CalendarListUseCase.instance)
      CalendarListUseCase.instance = new CalendarListUseCase();
    return CalendarListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ICalendarDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}