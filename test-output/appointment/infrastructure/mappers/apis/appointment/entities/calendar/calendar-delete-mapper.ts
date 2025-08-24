import { Mapper } from "@bus/core/classes";
import { ICalendarDeleteDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import { ICalendarDeleteEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/calendar";

export class CalendarDeleteMapper extends Mapper<ICalendarDeleteEntity, ICalendarDeleteDTO> {

  private static instance: CalendarDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): CalendarDeleteMapper {
    if (!CalendarDeleteMapper.instance)
      CalendarDeleteMapper.instance = new CalendarDeleteMapper();
    return CalendarDeleteMapper.instance;
  }

  public mapFrom(param: ICalendarDeleteEntity): ICalendarDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ICalendarDeleteEntity[]): ICalendarDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICalendarDeleteDTO): ICalendarDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ICalendarDeleteDTO[]): ICalendarDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}