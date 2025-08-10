import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICountryDTO, ICountryDeleteDTO } from "@platform/domain/models/apis/platform/entities/country";
import { InjectionPlatformEntitiesCountryMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-country-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class CountryDeleteUseCase implements UseCase<ICountryDeleteDTO, ICountryDTO | null> {
  private static instance: CountryDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.CountryRepository();
  private mapper = InjectionPlatformEntitiesCountryMapper.CountryDeleteMapper();

  public static getInstance(): CountryDeleteUseCase {
    if (!CountryDeleteUseCase.instance)
      CountryDeleteUseCase.instance = new CountryDeleteUseCase();
    return CountryDeleteUseCase.instance;
  }

  public async execute(params: ICountryDeleteDTO, config?: IConfigDTO): Promise<ICountryDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}