import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICountryDTO, ICountrySaveDTO } from "@bus/domain/models/apis/platform/entities/country";
import { InjectionPlatformEntitiesCountryMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-country-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class CountrySaveUseCase implements UseCase<ICountrySaveDTO, ICountryDTO | null> {
  private static instance: CountrySaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.CountryRepository();
  private mapper = InjectionPlatformEntitiesCountryMapper.CountrySaveMapper();

  public static getInstance(): CountrySaveUseCase {
    if (!CountrySaveUseCase.instance)
      CountrySaveUseCase.instance = new CountrySaveUseCase();
    return CountrySaveUseCase.instance;
  }

  public async execute(params: ICountrySaveDTO, config?: IConfigDTO): Promise<ICountryDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}