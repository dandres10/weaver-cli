import { ServiceCompanyDeleteMapper } from "@appointment/infrastructure/mappers/apis/appointment/entities/servicecompany/service-company-delete-mapper";
import { ServiceCompanyEntityMapper } from "@appointment/infrastructure/mappers/apis/appointment/entities/servicecompany/service-company-entity-mapper";
import { ServiceCompanyReadMapper } from "@appointment/infrastructure/mappers/apis/appointment/entities/servicecompany/service-company-read-mapper";
import { ServiceCompanySaveMapper } from "@appointment/infrastructure/mappers/apis/appointment/entities/servicecompany/service-company-save-mapper";
import { ServiceCompanyUpdateMapper } from "@appointment/infrastructure/mappers/apis/appointment/entities/servicecompany/service-company-update-mapper";

export class InjectionPlatformEntitiesServiceCompanyMapper {
  public static ServiceCompanyEntityMapper(): ServiceCompanyEntityMapper {
    return ServiceCompanyEntityMapper.getInstance();
  }

  public static ServiceCompanySaveMapper(): ServiceCompanySaveMapper {
    return ServiceCompanySaveMapper.getInstance();
  }

  public static ServiceCompanyReadMapper(): ServiceCompanyReadMapper {
    return ServiceCompanyReadMapper.getInstance();
  }

  public static ServiceCompanyUpdateMapper(): ServiceCompanyUpdateMapper {
    return ServiceCompanyUpdateMapper.getInstance();
  }

  public static ServiceCompanyDeleteMapper(): ServiceCompanyDeleteMapper {
    return ServiceCompanyDeleteMapper.getInstance();
  }
}