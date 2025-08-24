import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILanguageDTO, ILanguageSaveDTO } from "@platform/domain/models/apis/platform/entities/language";
import { InjectionPlatformEntitiesLanguageMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-language-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class LanguageSaveUseCase implements UseCase<ILanguageSaveDTO, ILanguageDTO | null> {
  private static instance: LanguageSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.LanguageRepository();
  private mapper = InjectionPlatformEntitiesLanguageMapper.LanguageSaveMapper();

  public static getInstance(): LanguageSaveUseCase {
    if (!LanguageSaveUseCase.instance)
      LanguageSaveUseCase.instance = new LanguageSaveUseCase();
    return LanguageSaveUseCase.instance;
  }

  public async execute(params: ILanguageSaveDTO, config?: IConfigDTO): Promise<ILanguageDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}