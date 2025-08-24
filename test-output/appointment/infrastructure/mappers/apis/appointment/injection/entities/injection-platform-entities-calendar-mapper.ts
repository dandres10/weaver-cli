import { CalendarDeleteMapper } from "@appointment/infrastructure/mappers/apis/appointment/entities/calendar/calendar-delete-mapper";
import { CalendarEntityMapper } from "@appointment/infrastructure/mappers/apis/appointment/entities/calendar/calendar-entity-mapper";
import { CalendarReadMapper } from "@appointment/infrastructure/mappers/apis/appointment/entities/calendar/calendar-read-mapper";
import { CalendarSaveMapper } from "@appointment/infrastructure/mappers/apis/appointment/entities/calendar/calendar-save-mapper";
import { CalendarUpdateMapper } from "@appointment/infrastructure/mappers/apis/appointment/entities/calendar/calendar-update-mapper";

export class InjectionPlatformEntitiesCalendarMapper {
  public static CalendarEntityMapper(): CalendarEntityMapper {
    return CalendarEntityMapper.getInstance();
  }

  public static CalendarSaveMapper(): CalendarSaveMapper {
    return CalendarSaveMapper.getInstance();
  }

  public static CalendarReadMapper(): CalendarReadMapper {
    return CalendarReadMapper.getInstance();
  }

  public static CalendarUpdateMapper(): CalendarUpdateMapper {
    return CalendarUpdateMapper.getInstance();
  }

  public static CalendarDeleteMapper(): CalendarDeleteMapper {
    return CalendarDeleteMapper.getInstance();
  }
}