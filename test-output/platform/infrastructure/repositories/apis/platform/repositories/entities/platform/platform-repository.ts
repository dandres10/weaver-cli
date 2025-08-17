import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { IPlatformRepository } from "@platform/domain/services/repositories/apis/platform/entities/i-platform-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IPlatformDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { IPlatformDeleteEntity, IPlatformEntity, IPlatformReadEntity, IPlatformSaveEntity, IPlatformUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/platform";
import { InjectionPlatformEntitiesPlatformMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-platform-mapper";

export class PlatformRepository extends IPlatformRepository {

    private static instance: PlatformRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly platformEntityMapper = InjectionPlatformEntitiesPlatformMapper.PlatformEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): PlatformRepository {
        if (!PlatformRepository.instance)
            PlatformRepository.instance = new PlatformRepository();
        return PlatformRepository.instance;
    }

    public async read(
        params: IPlatformReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IPlatformDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.PLATFORM}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IPlatformEntity>(data);
                    if (entity)
                        return this.platformEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: IPlatformSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IPlatformDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.PLATFORM, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IPlatformEntity>(data);
                    if (entity)
                        return this.platformEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: IPlatformUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IPlatformDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.PLATFORM, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IPlatformEntity>(data);
                    if (entity)
                        return this.platformEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: IPlatformDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IPlatformDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.PLATFORM}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IPlatformEntity>(data);
                    if (entity)
                        return this.platformEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IPlatformDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.PLATFORM_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<IPlatformEntity[]>(data);
                    if (entities)
                        return this.platformEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}