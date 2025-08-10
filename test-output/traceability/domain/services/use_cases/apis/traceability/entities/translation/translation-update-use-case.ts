import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ITranslationDTO, ITranslationUpdateDTO } from "@bus/domain/models/apis/platform/entities/translation";
import { InjectionPlatformEntitiesTranslationMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-translation-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class TranslationUpdateUseCase implements UseCase<ITranslationUpdateDTO, ITranslationDTO | null> {
  private static instance: TranslationUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.TranslationRepository();
  private mapper = InjectionPlatformEntitiesTranslationMapper.TranslationUpdateMapper();

  public static getInstance(): TranslationUpdateUseCase {
    if (!TranslationUpdateUseCase.instance)
      TranslationUpdateUseCase.instance = new TranslationUpdateUseCase();
    return TranslationUpdateUseCase.instance;
  }

  public async execute(params: ITranslationUpdateDTO, config?: IConfigDTO): Promise<ITranslationDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}