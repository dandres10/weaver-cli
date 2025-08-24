import { IConfigDTO } from "@bus/core/interfaces";
import {
  ICalendarDTO,
  ICalendarDeleteDTO,
  ICalendarReadDTO,
  ICalendarSaveDTO,
  ICalendarUpdateDTO,
} from "@appointment/domain/models/apis/appointment/entities/calendar";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesCalendarUseCase } from "@appointment/domain/services/use_cases/apis/appointment/injection/entities/injection-appointment-entities-calendar-use-case";

export class CalendarFacade {
  private static instance: CalendarFacade;

  private readonly readUseCase = InjectionPlatformEntitiesCalendarUseCase.CalendarReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesCalendarUseCase.CalendarSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesCalendarUseCase.CalendarUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesCalendarUseCase.CalendarDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesCalendarUseCase.CalendarListUseCase();

  public static getInstance(): CalendarFacade {
    if (!CalendarFacade.instance)
      CalendarFacade.instance = new CalendarFacade();
    return CalendarFacade.instance;
  }

  public async read(params: ICalendarReadDTO, config?: IConfigDTO): Promise<ICalendarDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: ICalendarSaveDTO, config?: IConfigDTO): Promise<ICalendarDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: ICalendarUpdateDTO, config?: IConfigDTO): Promise<ICalendarDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: ICalendarDeleteDTO, config?: IConfigDTO): Promise<ICalendarDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ICalendarDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}