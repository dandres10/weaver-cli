import { CountryDeleteUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/country/country-delete-use-case";
import { CountryListUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/country/country-list-use-case";
import { CountryReadUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/country/country-read-use-case";
import { CountrySaveUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/country/country-save-use-case";
import { CountryUpdateUseCase } from "@bus/domain/services/use_cases/apis/platform/entities/country/country-update-use-case";

export class InjectionPlatformEntitiesCountryUseCase {
  public static CountryReadUseCase(): CountryReadUseCase {
    return CountryReadUseCase.getInstance();
  }

  public static CountrySaveUseCase(): CountrySaveUseCase {
    return CountrySaveUseCase.getInstance();
  }

  public static CountryUpdateUseCase(): CountryUpdateUseCase {
    return CountryUpdateUseCase.getInstance();
  }

  public static CountryDeleteUseCase(): CountryDeleteUseCase {
    return CountryDeleteUseCase.getInstance();
  }

  public static CountryListUseCase(): CountryListUseCase {
    return CountryListUseCase.getInstance();
  }
}