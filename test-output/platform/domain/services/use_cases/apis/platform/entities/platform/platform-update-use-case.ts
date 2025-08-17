import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IPlatformDTO, IPlatformUpdateDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { InjectionPlatformEntitiesPlatformMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-platform-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class PlatformUpdateUseCase implements UseCase<IPlatformUpdateDTO, IPlatformDTO | null> {
  private static instance: PlatformUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.PlatformRepository();
  private mapper = InjectionPlatformEntitiesPlatformMapper.PlatformUpdateMapper();

  public static getInstance(): PlatformUpdateUseCase {
    if (!PlatformUpdateUseCase.instance)
      PlatformUpdateUseCase.instance = new PlatformUpdateUseCase();
    return PlatformUpdateUseCase.instance;
  }

  public async execute(params: IPlatformUpdateDTO, config?: IConfigDTO): Promise<IPlatformDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}