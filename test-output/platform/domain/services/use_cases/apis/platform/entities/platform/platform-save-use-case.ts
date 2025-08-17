import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IPlatformDTO, IPlatformSaveDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { InjectionPlatformEntitiesPlatformMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-platform-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class PlatformSaveUseCase implements UseCase<IPlatformSaveDTO, IPlatformDTO | null> {
  private static instance: PlatformSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.PlatformRepository();
  private mapper = InjectionPlatformEntitiesPlatformMapper.PlatformSaveMapper();

  public static getInstance(): PlatformSaveUseCase {
    if (!PlatformSaveUseCase.instance)
      PlatformSaveUseCase.instance = new PlatformSaveUseCase();
    return PlatformSaveUseCase.instance;
  }

  public async execute(params: IPlatformSaveDTO, config?: IConfigDTO): Promise<IPlatformDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}