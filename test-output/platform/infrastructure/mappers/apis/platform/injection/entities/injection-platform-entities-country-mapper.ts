import { CountryDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/entities/country/country-delete-mapper";
import { CountryEntityMapper } from "@platform/infrastructure/mappers/apis/platform/entities/country/country-entity-mapper";
import { CountryReadMapper } from "@platform/infrastructure/mappers/apis/platform/entities/country/country-read-mapper";
import { CountrySaveMapper } from "@platform/infrastructure/mappers/apis/platform/entities/country/country-save-mapper";
import { CountryUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/entities/country/country-update-mapper";

export class InjectionPlatformEntitiesCountryMapper {
  public static CountryEntityMapper(): CountryEntityMapper {
    return CountryEntityMapper.getInstance();
  }

  public static CountrySaveMapper(): CountrySaveMapper {
    return CountrySaveMapper.getInstance();
  }

  public static CountryReadMapper(): CountryReadMapper {
    return CountryReadMapper.getInstance();
  }

  public static CountryUpdateMapper(): CountryUpdateMapper {
    return CountryUpdateMapper.getInstance();
  }

  public static CountryDeleteMapper(): CountryDeleteMapper {
    return CountryDeleteMapper.getInstance();
  }
}