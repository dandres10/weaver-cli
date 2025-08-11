import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { IApiTokenRepository } from "@platform/domain/services/repositories/apis/platform/entities/i-api-token-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IApiTokenDTO } from "@platform/domain/models/apis/platform/entities/apitoken";
import { IApiTokenDeleteEntity, IApiTokenEntity, IApiTokenReadEntity, IApiTokenSaveEntity, IApiTokenUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/apitoken";
import { InjectionPlatformEntitiesApiTokenMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-api-token-mapper";

export class ApiTokenRepository extends IApiTokenRepository {

    private static instance: ApiTokenRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly apitokenEntityMapper = InjectionPlatformEntitiesApiTokenMapper.ApiTokenEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): ApiTokenRepository {
        if (!ApiTokenRepository.instance)
            ApiTokenRepository.instance = new ApiTokenRepository();
        return ApiTokenRepository.instance;
    }

    public async read(
        params: IApiTokenReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IApiTokenDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.APITOKEN}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IApiTokenEntity>(data);
                    if (entity)
                        return this.apitokenEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: IApiTokenSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IApiTokenDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.APITOKEN, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IApiTokenEntity>(data);
                    if (entity)
                        return this.apitokenEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: IApiTokenUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IApiTokenDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.APITOKEN, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IApiTokenEntity>(data);
                    if (entity)
                        return this.apitokenEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: IApiTokenDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IApiTokenDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.APITOKEN}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IApiTokenEntity>(data);
                    if (entity)
                        return this.apitokenEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IApiTokenDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.APITOKEN_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<IApiTokenEntity[]>(data);
                    if (entities)
                        return this.apitokenEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}