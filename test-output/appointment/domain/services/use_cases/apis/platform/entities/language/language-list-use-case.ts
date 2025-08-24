import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILanguageDTO } from "@platform/domain/models/apis/platform/entities/language";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class LanguageListUseCase implements UseCase<IPaginationBackendDTO, ILanguageDTO[] | null> {
  private static instance: LanguageListUseCase;
  private repository = InjectionPlatformEntitiesRepository.LanguageRepository();

  public static getInstance(): LanguageListUseCase {
    if (!LanguageListUseCase.instance)
      LanguageListUseCase.instance = new LanguageListUseCase();
    return LanguageListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ILanguageDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}