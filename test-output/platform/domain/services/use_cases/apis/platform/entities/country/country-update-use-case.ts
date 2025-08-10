import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICountryDTO, ICountryUpdateDTO } from "@platform/domain/models/apis/platform/entities/country";
import { InjectionPlatformEntitiesCountryMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-country-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class CountryUpdateUseCase implements UseCase<ICountryUpdateDTO, ICountryDTO | null> {
  private static instance: CountryUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.CountryRepository();
  private mapper = InjectionPlatformEntitiesCountryMapper.CountryUpdateMapper();

  public static getInstance(): CountryUpdateUseCase {
    if (!CountryUpdateUseCase.instance)
      CountryUpdateUseCase.instance = new CountryUpdateUseCase();
    return CountryUpdateUseCase.instance;
  }

  public async execute(params: ICountryUpdateDTO, config?: IConfigDTO): Promise<ICountryDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}