import { ServiceCompanyDeleteUseCase } from "@appointment/domain/services/use_cases/apis/appointment/entities/servicecompany/service-company-delete-use-case";
import { ServiceCompanyListUseCase } from "@appointment/domain/services/use_cases/apis/appointment/entities/servicecompany/service-company-list-use-case";
import { ServiceCompanyReadUseCase } from "@appointment/domain/services/use_cases/apis/appointment/entities/servicecompany/service-company-read-use-case";
import { ServiceCompanySaveUseCase } from "@appointment/domain/services/use_cases/apis/appointment/entities/servicecompany/service-company-save-use-case";
import { ServiceCompanyUpdateUseCase } from "@appointment/domain/services/use_cases/apis/appointment/entities/servicecompany/service-company-update-use-case";

export class InjectionPlatformEntitiesServiceCompanyUseCase {
  public static ServiceCompanyReadUseCase(): ServiceCompanyReadUseCase {
    return ServiceCompanyReadUseCase.getInstance();
  }

  public static ServiceCompanySaveUseCase(): ServiceCompanySaveUseCase {
    return ServiceCompanySaveUseCase.getInstance();
  }

  public static ServiceCompanyUpdateUseCase(): ServiceCompanyUpdateUseCase {
    return ServiceCompanyUpdateUseCase.getInstance();
  }

  public static ServiceCompanyDeleteUseCase(): ServiceCompanyDeleteUseCase {
    return ServiceCompanyDeleteUseCase.getInstance();
  }

  public static ServiceCompanyListUseCase(): ServiceCompanyListUseCase {
    return ServiceCompanyListUseCase.getInstance();
  }
}