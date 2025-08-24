import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ICalendarDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import {
  ICalendarDeleteEntity,
  ICalendarReadEntity,
  ICalendarSaveEntity,
  ICalendarUpdateEntity,
} from "@appointment/infrastructure/entities/apis/appointment/entities/calendar";

export abstract class ICalendarRepository {
  abstract read(params: ICalendarReadEntity, config: IConfigDTO): Promise<ICalendarDTO | null>;
  abstract save(params: ICalendarSaveEntity, config: IConfigDTO): Promise<ICalendarDTO | null>;
  abstract update(params: ICalendarUpdateEntity, config: IConfigDTO): Promise<ICalendarDTO | null>;
  abstract delete(params: ICalendarDeleteEntity, config: IConfigDTO): Promise<ICalendarDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<ICalendarDTO[] | null>;
}