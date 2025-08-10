import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ITranslationDTO, ITranslationDeleteDTO } from "@bus/domain/models/apis/platform/entities/translation";
import { InjectionPlatformEntitiesTranslationMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-translation-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class TranslationDeleteUseCase implements UseCase<ITranslationDeleteDTO, ITranslationDTO | null> {
  private static instance: TranslationDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.TranslationRepository();
  private mapper = InjectionPlatformEntitiesTranslationMapper.TranslationDeleteMapper();

  public static getInstance(): TranslationDeleteUseCase {
    if (!TranslationDeleteUseCase.instance)
      TranslationDeleteUseCase.instance = new TranslationDeleteUseCase();
    return TranslationDeleteUseCase.instance;
  }

  public async execute(params: ITranslationDeleteDTO, config?: IConfigDTO): Promise<ITranslationDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}