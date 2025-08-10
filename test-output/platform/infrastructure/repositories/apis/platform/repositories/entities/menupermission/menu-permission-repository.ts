import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { IMenuPermissionRepository } from "@platform/domain/services/repositories/apis/platform/entities/i-menu-permission-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IMenuPermissionDTO } from "@platform/domain/models/apis/platform/entities/menupermission";
import { IMenuPermissionDeleteEntity, IMenuPermissionEntity, IMenuPermissionReadEntity, IMenuPermissionSaveEntity, IMenuPermissionUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/menupermission";
import { InjectionPlatformEntitiesMenuPermissionMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-menu-permission-mapper";

export class MenuPermissionRepository extends IMenuPermissionRepository {

    private static instance: MenuPermissionRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly menupermissionEntityMapper = InjectionPlatformEntitiesMenuPermissionMapper.MenuPermissionEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): MenuPermissionRepository {
        if (!MenuPermissionRepository.instance)
            MenuPermissionRepository.instance = new MenuPermissionRepository();
        return MenuPermissionRepository.instance;
    }

    public async read(
        params: IMenuPermissionReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IMenuPermissionDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.MENUPERMISSION}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IMenuPermissionEntity>(data);
                    if (entity)
                        return this.menupermissionEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: IMenuPermissionSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IMenuPermissionDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.MENUPERMISSION, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IMenuPermissionEntity>(data);
                    if (entity)
                        return this.menupermissionEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: IMenuPermissionUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IMenuPermissionDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.MENUPERMISSION, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IMenuPermissionEntity>(data);
                    if (entity)
                        return this.menupermissionEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: IMenuPermissionDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IMenuPermissionDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.MENUPERMISSION}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IMenuPermissionEntity>(data);
                    if (entity)
                        return this.menupermissionEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IMenuPermissionDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.MENUPERMISSION_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<IMenuPermissionEntity[]>(data);
                    if (entities)
                        return this.menupermissionEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}