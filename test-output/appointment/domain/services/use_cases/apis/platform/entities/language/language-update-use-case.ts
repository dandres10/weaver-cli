import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILanguageDTO, ILanguageUpdateDTO } from "@platform/domain/models/apis/platform/entities/language";
import { InjectionPlatformEntitiesLanguageMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-language-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class LanguageUpdateUseCase implements UseCase<ILanguageUpdateDTO, ILanguageDTO | null> {
  private static instance: LanguageUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.LanguageRepository();
  private mapper = InjectionPlatformEntitiesLanguageMapper.LanguageUpdateMapper();

  public static getInstance(): LanguageUpdateUseCase {
    if (!LanguageUpdateUseCase.instance)
      LanguageUpdateUseCase.instance = new LanguageUpdateUseCase();
    return LanguageUpdateUseCase.instance;
  }

  public async execute(params: ILanguageUpdateDTO, config?: IConfigDTO): Promise<ILanguageDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}