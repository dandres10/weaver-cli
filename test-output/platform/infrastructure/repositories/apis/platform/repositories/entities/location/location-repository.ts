import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { ILocationRepository } from "@platform/domain/services/repositories/apis/platform/entities/i-location-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ILocationDTO } from "@platform/domain/models/apis/platform/entities/location";
import { ILocationDeleteEntity, ILocationEntity, ILocationReadEntity, ILocationSaveEntity, ILocationUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/location";
import { InjectionPlatformEntitiesLocationMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-location-mapper";

export class LocationRepository extends ILocationRepository {

    private static instance: LocationRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly locationEntityMapper = InjectionPlatformEntitiesLocationMapper.LocationEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): LocationRepository {
        if (!LocationRepository.instance)
            LocationRepository.instance = new LocationRepository();
        return LocationRepository.instance;
    }

    public async read(
        params: ILocationReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ILocationDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.LOCATION}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ILocationEntity>(data);
                    if (entity)
                        return this.locationEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: ILocationSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ILocationDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.LOCATION, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ILocationEntity>(data);
                    if (entity)
                        return this.locationEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: ILocationUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ILocationDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.LOCATION, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ILocationEntity>(data);
                    if (entity)
                        return this.locationEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: ILocationDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ILocationDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.LOCATION}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ILocationEntity>(data);
                    if (entity)
                        return this.locationEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ILocationDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.LOCATION_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<ILocationEntity[]>(data);
                    if (entities)
                        return this.locationEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}