import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IPlatformDTO, IPlatformReadDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { InjectionPlatformEntitiesPlatformMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-platform-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class PlatformReadUseCase implements UseCase<IPlatformReadDTO, IPlatformDTO | null> {
  private static instance: PlatformReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.PlatformRepository();
  private mapper = InjectionPlatformEntitiesPlatformMapper.PlatformReadMapper();

  public static getInstance(): PlatformReadUseCase {
    if (!PlatformReadUseCase.instance)
      PlatformReadUseCase.instance = new PlatformReadUseCase();
    return PlatformReadUseCase.instance;
  }

  public async execute(params: IPlatformReadDTO, config?: IConfigDTO): Promise<IPlatformDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}