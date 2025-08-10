import { CompanyDeleteUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/company/company-delete-use-case";
import { CompanyListUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/company/company-list-use-case";
import { CompanyReadUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/company/company-read-use-case";
import { CompanySaveUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/company/company-save-use-case";
import { CompanyUpdateUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/company/company-update-use-case";

export class InjectionPlatformEntitiesCompanyUseCase {
  public static CompanyReadUseCase(): CompanyReadUseCase {
    return CompanyReadUseCase.getInstance();
  }

  public static CompanySaveUseCase(): CompanySaveUseCase {
    return CompanySaveUseCase.getInstance();
  }

  public static CompanyUpdateUseCase(): CompanyUpdateUseCase {
    return CompanyUpdateUseCase.getInstance();
  }

  public static CompanyDeleteUseCase(): CompanyDeleteUseCase {
    return CompanyDeleteUseCase.getInstance();
  }

  public static CompanyListUseCase(): CompanyListUseCase {
    return CompanyListUseCase.getInstance();
  }
}