import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IPlatformDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class PlatformListUseCase implements UseCase<IPaginationBackendDTO, IPlatformDTO[] | null> {
  private static instance: PlatformListUseCase;
  private repository = InjectionPlatformEntitiesRepository.PlatformRepository();

  public static getInstance(): PlatformListUseCase {
    if (!PlatformListUseCase.instance)
      PlatformListUseCase.instance = new PlatformListUseCase();
    return PlatformListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IPlatformDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}