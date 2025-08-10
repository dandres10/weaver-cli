import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILocationDTO } from "@platform/domain/models/apis/platform/entities/location";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class LocationListUseCase implements UseCase<IPaginationBackendDTO, ILocationDTO[] | null> {
  private static instance: LocationListUseCase;
  private repository = InjectionPlatformEntitiesRepository.LocationRepository();

  public static getInstance(): LocationListUseCase {
    if (!LocationListUseCase.instance)
      LocationListUseCase.instance = new LocationListUseCase();
    return LocationListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ILocationDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}