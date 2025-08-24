import { Mapper } from "@bus/core/classes";
import { ICalendarDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import { ICalendarEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/calendar";

export class CalendarEntityMapper extends Mapper<ICalendarEntity, ICalendarDTO> {
  private static instance: CalendarEntityMapper;
  public constructor() { super(); }

  public static getInstance(): CalendarEntityMapper {
    if (!CalendarEntityMapper.instance)
      CalendarEntityMapper.instance = new CalendarEntityMapper();
    return CalendarEntityMapper.instance;
  }

  public mapFrom(param: ICalendarEntity): ICalendarDTO {
    return {
      id: param.id,
      id: param.id,
      userLocationRolId: param.user_location_rol_id,
      state: param.state,
      dateStart: param.date_start,
      dateEnd: param.date_end
    };
  }

  public mapFromList(params: ICalendarEntity[]): ICalendarDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICalendarDTO): ICalendarEntity {
    return {
      id: param.id,
      id: param.id,
      user_location_rol_id: param.userLocationRolId,
      state: param.state,
      date_start: param.dateStart,
      date_end: param.dateEnd
    };
  }

  public mapToList(params: ICalendarDTO[]): ICalendarEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}