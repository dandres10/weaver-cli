import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICountryDTO, ICountryReadDTO } from "@platform/domain/models/apis/platform/entities/country";
import { InjectionPlatformEntitiesCountryMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-country-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class CountryReadUseCase implements UseCase<ICountryReadDTO, ICountryDTO | null> {
  private static instance: CountryReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.CountryRepository();
  private mapper = InjectionPlatformEntitiesCountryMapper.CountryReadMapper();

  public static getInstance(): CountryReadUseCase {
    if (!CountryReadUseCase.instance)
      CountryReadUseCase.instance = new CountryReadUseCase();
    return CountryReadUseCase.instance;
  }

  public async execute(params: ICountryReadDTO, config?: IConfigDTO): Promise<ICountryDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}