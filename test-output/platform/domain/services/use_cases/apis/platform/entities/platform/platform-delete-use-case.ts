import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IPlatformDTO, IPlatformDeleteDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { InjectionPlatformEntitiesPlatformMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-platform-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class PlatformDeleteUseCase implements UseCase<IPlatformDeleteDTO, IPlatformDTO | null> {
  private static instance: PlatformDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.PlatformRepository();
  private mapper = InjectionPlatformEntitiesPlatformMapper.PlatformDeleteMapper();

  public static getInstance(): PlatformDeleteUseCase {
    if (!PlatformDeleteUseCase.instance)
      PlatformDeleteUseCase.instance = new PlatformDeleteUseCase();
    return PlatformDeleteUseCase.instance;
  }

  public async execute(params: IPlatformDeleteDTO, config?: IConfigDTO): Promise<IPlatformDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}