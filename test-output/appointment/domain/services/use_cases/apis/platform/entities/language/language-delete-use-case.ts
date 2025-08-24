import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILanguageDTO, ILanguageDeleteDTO } from "@platform/domain/models/apis/platform/entities/language";
import { InjectionPlatformEntitiesLanguageMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-language-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class LanguageDeleteUseCase implements UseCase<ILanguageDeleteDTO, ILanguageDTO | null> {
  private static instance: LanguageDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.LanguageRepository();
  private mapper = InjectionPlatformEntitiesLanguageMapper.LanguageDeleteMapper();

  public static getInstance(): LanguageDeleteUseCase {
    if (!LanguageDeleteUseCase.instance)
      LanguageDeleteUseCase.instance = new LanguageDeleteUseCase();
    return LanguageDeleteUseCase.instance;
  }

  public async execute(params: ILanguageDeleteDTO, config?: IConfigDTO): Promise<ILanguageDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}