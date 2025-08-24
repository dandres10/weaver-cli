import { IConfigDTO } from "@bus/core/interfaces";
import {
  ILanguageDTO,
  ILanguageDeleteDTO,
  ILanguageReadDTO,
  ILanguageSaveDTO,
  ILanguageUpdateDTO,
} from "@platform/domain/models/apis/platform/entities/language";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesLanguageUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-language-use-case";

export class LanguageFacade {
  private static instance: LanguageFacade;

  private readonly readUseCase = InjectionPlatformEntitiesLanguageUseCase.LanguageReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesLanguageUseCase.LanguageSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesLanguageUseCase.LanguageUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesLanguageUseCase.LanguageDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesLanguageUseCase.LanguageListUseCase();

  public static getInstance(): LanguageFacade {
    if (!LanguageFacade.instance)
      LanguageFacade.instance = new LanguageFacade();
    return LanguageFacade.instance;
  }

  public async read(params: ILanguageReadDTO, config?: IConfigDTO): Promise<ILanguageDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: ILanguageSaveDTO, config?: IConfigDTO): Promise<ILanguageDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: ILanguageUpdateDTO, config?: IConfigDTO): Promise<ILanguageDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: ILanguageDeleteDTO, config?: IConfigDTO): Promise<ILanguageDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ILanguageDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}