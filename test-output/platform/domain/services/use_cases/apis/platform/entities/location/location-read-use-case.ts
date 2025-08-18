import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILocationDTO, ILocationReadDTO } from "@platform/domain/models/apis/platform/entities/location";
import { InjectionPlatformEntitiesLocationMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-location-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class LocationReadUseCase implements UseCase<ILocationReadDTO, ILocationDTO | null> {
  private static instance: LocationReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.LocationRepository();
  private mapper = InjectionPlatformEntitiesLocationMapper.LocationReadMapper();

  public static getInstance(): LocationReadUseCase {
    if (!LocationReadUseCase.instance)
      LocationReadUseCase.instance = new LocationReadUseCase();
    return LocationReadUseCase.instance;
  }

  public async execute(params: ILocationReadDTO, config?: IConfigDTO): Promise<ILocationDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}