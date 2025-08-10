import { IConfigDTO } from "@bus/core/interfaces";
import {
  ITranslationDTO,
  ITranslationDeleteDTO,
  ITranslationReadDTO,
  ITranslationSaveDTO,
  ITranslationUpdateDTO,
} from "@bus/domain/models/apis/platform/entities/translation";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesTranslationUseCase } from "@bus/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-translation-use-case";

export class TranslationFacade {
  private static instance: TranslationFacade;

  private readonly readUseCase = InjectionPlatformEntitiesTranslationUseCase.TranslationReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesTranslationUseCase.TranslationSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesTranslationUseCase.TranslationUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesTranslationUseCase.TranslationDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesTranslationUseCase.TranslationListUseCase();

  public static getInstance(): TranslationFacade {
    if (!TranslationFacade.instance)
      TranslationFacade.instance = new TranslationFacade();
    return TranslationFacade.instance;
  }

  public async read(params: ITranslationReadDTO, config?: IConfigDTO): Promise<ITranslationDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: ITranslationSaveDTO, config?: IConfigDTO): Promise<ITranslationDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: ITranslationUpdateDTO, config?: IConfigDTO): Promise<ITranslationDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: ITranslationDeleteDTO, config?: IConfigDTO): Promise<ITranslationDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ITranslationDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}