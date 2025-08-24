import { IConfigDTO } from "@bus/core/interfaces";
import {
  ILocationDTO,
  ILocationDeleteDTO,
  ILocationReadDTO,
  ILocationSaveDTO,
  ILocationUpdateDTO,
} from "@platform/domain/models/apis/platform/entities/location";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesLocationUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-location-use-case";

export class LocationFacade {
  private static instance: LocationFacade;

  private readonly readUseCase = InjectionPlatformEntitiesLocationUseCase.LocationReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesLocationUseCase.LocationSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesLocationUseCase.LocationUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesLocationUseCase.LocationDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesLocationUseCase.LocationListUseCase();

  public static getInstance(): LocationFacade {
    if (!LocationFacade.instance)
      LocationFacade.instance = new LocationFacade();
    return LocationFacade.instance;
  }

  public async read(params: ILocationReadDTO, config?: IConfigDTO): Promise<ILocationDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: ILocationSaveDTO, config?: IConfigDTO): Promise<ILocationDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: ILocationUpdateDTO, config?: IConfigDTO): Promise<ILocationDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: ILocationDeleteDTO, config?: IConfigDTO): Promise<ILocationDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ILocationDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}