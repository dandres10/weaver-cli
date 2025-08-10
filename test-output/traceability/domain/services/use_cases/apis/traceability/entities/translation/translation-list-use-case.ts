import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ITranslationDTO } from "@bus/domain/models/apis/platform/entities/translation";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class TranslationListUseCase implements UseCase<IPaginationBackendDTO, ITranslationDTO[] | null> {
  private static instance: TranslationListUseCase;
  private repository = InjectionPlatformEntitiesRepository.TranslationRepository();

  public static getInstance(): TranslationListUseCase {
    if (!TranslationListUseCase.instance)
      TranslationListUseCase.instance = new TranslationListUseCase();
    return TranslationListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ITranslationDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}