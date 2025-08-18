import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILocationDTO, ILocationDeleteDTO } from "@platform/domain/models/apis/platform/entities/location";
import { InjectionPlatformEntitiesLocationMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-location-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class LocationDeleteUseCase implements UseCase<ILocationDeleteDTO, ILocationDTO | null> {
  private static instance: LocationDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.LocationRepository();
  private mapper = InjectionPlatformEntitiesLocationMapper.LocationDeleteMapper();

  public static getInstance(): LocationDeleteUseCase {
    if (!LocationDeleteUseCase.instance)
      LocationDeleteUseCase.instance = new LocationDeleteUseCase();
    return LocationDeleteUseCase.instance;
  }

  public async execute(params: ILocationDeleteDTO, config?: IConfigDTO): Promise<ILocationDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}