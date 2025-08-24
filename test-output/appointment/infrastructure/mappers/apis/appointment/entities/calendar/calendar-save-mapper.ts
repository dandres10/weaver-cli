import { Mapper } from "@bus/core/classes";
import { ICalendarSaveDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import { ICalendarSaveEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/calendar";

export class CalendarSaveMapper extends Mapper<ICalendarSaveEntity, ICalendarSaveDTO> {

  private static instance: CalendarSaveMapper;
  public constructor() { super(); }

  public static getInstance(): CalendarSaveMapper {
    if (!CalendarSaveMapper.instance)
      CalendarSaveMapper.instance = new CalendarSaveMapper();
    return CalendarSaveMapper.instance;
  }

  public mapFrom(param: ICalendarSaveEntity): ICalendarSaveDTO {
    return {
      userLocationRolId: param.user_location_rol_id,
      state: param.state,
      dateStart: param.date_start,
      dateEnd: param.date_end
    };
  }

  public mapFromList(params: ICalendarSaveEntity[]): ICalendarSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICalendarSaveDTO): ICalendarSaveEntity {
    return {
      user_location_rol_id: param.userLocationRolId,
      state: param.state ?? true,
      date_start: param.dateStart,
      date_end: param.dateEnd
    };
  }

  public mapToList(params: ICalendarSaveDTO[]): ICalendarSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}