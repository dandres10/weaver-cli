import { Mapper } from "@bus/core/classes";
import { ICalendarUpdateDTO } from "@appointment/domain/models/apis/appointment/entities/calendar";
import { ICalendarUpdateEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/calendar";

export class CalendarUpdateMapper extends Mapper<ICalendarUpdateEntity, ICalendarUpdateDTO> {

  private static instance: CalendarUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): CalendarUpdateMapper {
    if (!CalendarUpdateMapper.instance)
      CalendarUpdateMapper.instance = new CalendarUpdateMapper();
    return CalendarUpdateMapper.instance;
  }

  public mapFrom(param: ICalendarUpdateEntity): ICalendarUpdateDTO {
    return {
      id: param.id,
      userLocationRolId: param.user_location_rol_id,
      state: param.state,
      dateStart: param.date_start,
      dateEnd: param.date_end
    };
  }

  public mapFromList(params: ICalendarUpdateEntity[]): ICalendarUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICalendarUpdateDTO): ICalendarUpdateEntity {
    return {
      id: param.id,
      user_location_rol_id: param.userLocationRolId,
      state: param.state,
      date_start: param.dateStart,
      date_end: param.dateEnd
    };
  }

  public mapToList(params: ICalendarUpdateDTO[]): ICalendarUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}