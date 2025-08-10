import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { IRolPermissionRepository } from "@bus/domain/services/repositories/apis/platform/entities/i-rol-permission-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IRolPermissionDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import { IRolPermissionDeleteEntity, IRolPermissionEntity, IRolPermissionReadEntity, IRolPermissionSaveEntity, IRolPermissionUpdateEntity } from "@bus/infrastructure/entities/apis/platform/entities/rolpermission";
import { InjectionPlatformEntitiesRolPermissionMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-rol-permission-mapper";

export class RolPermissionRepository extends IRolPermissionRepository {

    private static instance: RolPermissionRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly rolpermissionEntityMapper = InjectionPlatformEntitiesRolPermissionMapper.RolPermissionEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): RolPermissionRepository {
        if (!RolPermissionRepository.instance)
            RolPermissionRepository.instance = new RolPermissionRepository();
        return RolPermissionRepository.instance;
    }

    public async read(
        params: IRolPermissionReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IRolPermissionDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.ROLPERMISSION}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IRolPermissionEntity>(data);
                    if (entity)
                        return this.rolpermissionEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: IRolPermissionSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IRolPermissionDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.ROLPERMISSION, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IRolPermissionEntity>(data);
                    if (entity)
                        return this.rolpermissionEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: IRolPermissionUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IRolPermissionDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.ROLPERMISSION, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IRolPermissionEntity>(data);
                    if (entity)
                        return this.rolpermissionEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: IRolPermissionDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IRolPermissionDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.ROLPERMISSION}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IRolPermissionEntity>(data);
                    if (entity)
                        return this.rolpermissionEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IRolPermissionDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.ROLPERMISSION_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<IRolPermissionEntity[]>(data);
                    if (entities)
                        return this.rolpermissionEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}