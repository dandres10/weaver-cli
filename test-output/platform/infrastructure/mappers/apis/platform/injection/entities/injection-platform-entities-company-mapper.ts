import { CompanyDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/entities/company/company-delete-mapper";
import { CompanyEntityMapper } from "@platform/infrastructure/mappers/apis/platform/entities/company/company-entity-mapper";
import { CompanyReadMapper } from "@platform/infrastructure/mappers/apis/platform/entities/company/company-read-mapper";
import { CompanySaveMapper } from "@platform/infrastructure/mappers/apis/platform/entities/company/company-save-mapper";
import { CompanyUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/entities/company/company-update-mapper";

export class InjectionPlatformEntitiesCompanyMapper {
  public static CompanyEntityMapper(): CompanyEntityMapper {
    return CompanyEntityMapper.getInstance();
  }

  public static CompanySaveMapper(): CompanySaveMapper {
    return CompanySaveMapper.getInstance();
  }

  public static CompanyReadMapper(): CompanyReadMapper {
    return CompanyReadMapper.getInstance();
  }

  public static CompanyUpdateMapper(): CompanyUpdateMapper {
    return CompanyUpdateMapper.getInstance();
  }

  public static CompanyDeleteMapper(): CompanyDeleteMapper {
    return CompanyDeleteMapper.getInstance();
  }
}