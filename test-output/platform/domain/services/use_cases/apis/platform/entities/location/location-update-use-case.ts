import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILocationDTO, ILocationUpdateDTO } from "@platform/domain/models/apis/platform/entities/location";
import { InjectionPlatformEntitiesLocationMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-location-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class LocationUpdateUseCase implements UseCase<ILocationUpdateDTO, ILocationDTO | null> {
  private static instance: LocationUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.LocationRepository();
  private mapper = InjectionPlatformEntitiesLocationMapper.LocationUpdateMapper();

  public static getInstance(): LocationUpdateUseCase {
    if (!LocationUpdateUseCase.instance)
      LocationUpdateUseCase.instance = new LocationUpdateUseCase();
    return LocationUpdateUseCase.instance;
  }

  public async execute(params: ILocationUpdateDTO, config?: IConfigDTO): Promise<ILocationDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}