import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILanguageDTO, ILanguageReadDTO } from "@platform/domain/models/apis/platform/entities/language";
import { InjectionPlatformEntitiesLanguageMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-language-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class LanguageReadUseCase implements UseCase<ILanguageReadDTO, ILanguageDTO | null> {
  private static instance: LanguageReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.LanguageRepository();
  private mapper = InjectionPlatformEntitiesLanguageMapper.LanguageReadMapper();

  public static getInstance(): LanguageReadUseCase {
    if (!LanguageReadUseCase.instance)
      LanguageReadUseCase.instance = new LanguageReadUseCase();
    return LanguageReadUseCase.instance;
  }

  public async execute(params: ILanguageReadDTO, config?: IConfigDTO): Promise<ILanguageDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}