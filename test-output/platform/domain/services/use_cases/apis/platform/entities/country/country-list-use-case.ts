import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICountryDTO } from "@platform/domain/models/apis/platform/entities/country";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class CountryListUseCase implements UseCase<IPaginationBackendDTO, ICountryDTO[] | null> {
  private static instance: CountryListUseCase;
  private repository = InjectionPlatformEntitiesRepository.CountryRepository();

  public static getInstance(): CountryListUseCase {
    if (!CountryListUseCase.instance)
      CountryListUseCase.instance = new CountryListUseCase();
    return CountryListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ICountryDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}