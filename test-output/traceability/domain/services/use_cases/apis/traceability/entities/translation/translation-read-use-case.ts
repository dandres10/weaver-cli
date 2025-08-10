import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ITranslationDTO, ITranslationReadDTO } from "@bus/domain/models/apis/platform/entities/translation";
import { InjectionPlatformEntitiesTranslationMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-translation-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class TranslationReadUseCase implements UseCase<ITranslationReadDTO, ITranslationDTO | null> {
  private static instance: TranslationReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.TranslationRepository();
  private mapper = InjectionPlatformEntitiesTranslationMapper.TranslationReadMapper();

  public static getInstance(): TranslationReadUseCase {
    if (!TranslationReadUseCase.instance)
      TranslationReadUseCase.instance = new TranslationReadUseCase();
    return TranslationReadUseCase.instance;
  }

  public async execute(params: ITranslationReadDTO, config?: IConfigDTO): Promise<ITranslationDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}