import { Mapper } from "@bus/core/classes";
import { ICalendarReadDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import { ICalendarReadEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/calendar";

export class CalendarReadMapper extends Mapper<ICalendarReadEntity, ICalendarReadDTO> {

  private static instance: CalendarReadMapper;
  public constructor() { super(); }

  public static getInstance(): CalendarReadMapper {
    if (!CalendarReadMapper.instance)
      CalendarReadMapper.instance = new CalendarReadMapper();
    return CalendarReadMapper.instance;
  }

  public mapFrom(param: ICalendarReadEntity): ICalendarReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ICalendarReadEntity[]): ICalendarReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICalendarReadDTO): ICalendarReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ICalendarReadDTO[]): ICalendarReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}