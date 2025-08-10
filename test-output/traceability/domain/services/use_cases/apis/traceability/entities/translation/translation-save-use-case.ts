import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ITranslationDTO, ITranslationSaveDTO } from "@bus/domain/models/apis/platform/entities/translation";
import { InjectionPlatformEntitiesTranslationMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-translation-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class TranslationSaveUseCase implements UseCase<ITranslationSaveDTO, ITranslationDTO | null> {
  private static instance: TranslationSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.TranslationRepository();
  private mapper = InjectionPlatformEntitiesTranslationMapper.TranslationSaveMapper();

  public static getInstance(): TranslationSaveUseCase {
    if (!TranslationSaveUseCase.instance)
      TranslationSaveUseCase.instance = new TranslationSaveUseCase();
    return TranslationSaveUseCase.instance;
  }

  public async execute(params: ITranslationSaveDTO, config?: IConfigDTO): Promise<ITranslationDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}