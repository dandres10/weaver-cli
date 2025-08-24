import { CalendarDeleteUseCase } from "@appointment/domain/services/use_cases/apis/appointment/entities/calendar/calendar-delete-use-case";
import { CalendarListUseCase } from "@appointment/domain/services/use_cases/apis/appointment/entities/calendar/calendar-list-use-case";
import { CalendarReadUseCase } from "@appointment/domain/services/use_cases/apis/appointment/entities/calendar/calendar-read-use-case";
import { CalendarSaveUseCase } from "@appointment/domain/services/use_cases/apis/appointment/entities/calendar/calendar-save-use-case";
import { CalendarUpdateUseCase } from "@appointment/domain/services/use_cases/apis/appointment/entities/calendar/calendar-update-use-case";

export class InjectionPlatformEntitiesCalendarUseCase {
  public static CalendarReadUseCase(): CalendarReadUseCase {
    return CalendarReadUseCase.getInstance();
  }

  public static CalendarSaveUseCase(): CalendarSaveUseCase {
    return CalendarSaveUseCase.getInstance();
  }

  public static CalendarUpdateUseCase(): CalendarUpdateUseCase {
    return CalendarUpdateUseCase.getInstance();
  }

  public static CalendarDeleteUseCase(): CalendarDeleteUseCase {
    return CalendarDeleteUseCase.getInstance();
  }

  public static CalendarListUseCase(): CalendarListUseCase {
    return CalendarListUseCase.getInstance();
  }
}