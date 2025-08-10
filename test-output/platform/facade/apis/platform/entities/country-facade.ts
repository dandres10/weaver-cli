import { IConfigDTO } from "@bus/core/interfaces";
import {
  ICountryDTO,
  ICountryDeleteDTO,
  ICountryReadDTO,
  ICountrySaveDTO,
  ICountryUpdateDTO,
} from "@bus/domain/models/apis/platform/entities/country";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesCountryUseCase } from "@bus/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-country-use-case";

export class CountryFacade {
  private static instance: CountryFacade;

  private readonly readUseCase = InjectionPlatformEntitiesCountryUseCase.CountryReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesCountryUseCase.CountrySaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesCountryUseCase.CountryUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesCountryUseCase.CountryDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesCountryUseCase.CountryListUseCase();

  public static getInstance(): CountryFacade {
    if (!CountryFacade.instance)
      CountryFacade.instance = new CountryFacade();
    return CountryFacade.instance;
  }

  public async read(params: ICountryReadDTO, config?: IConfigDTO): Promise<ICountryDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: ICountrySaveDTO, config?: IConfigDTO): Promise<ICountryDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: ICountryUpdateDTO, config?: IConfigDTO): Promise<ICountryDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: ICountryDeleteDTO, config?: IConfigDTO): Promise<ICountryDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ICountryDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}