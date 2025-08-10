import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { IMenuRepository } from "@bus/domain/services/repositories/apis/platform/entities/i-menu-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IMenuDTO } from "@bus/domain/models/apis/platform/entities/menu";
import { IMenuDeleteEntity, IMenuEntity, IMenuReadEntity, IMenuSaveEntity, IMenuUpdateEntity } from "@bus/infrastructure/entities/apis/platform/entities/menu";
import { InjectionPlatformEntitiesMenuMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-menu-mapper";

export class MenuRepository extends IMenuRepository {

    private static instance: MenuRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly menuEntityMapper = InjectionPlatformEntitiesMenuMapper.MenuEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): MenuRepository {
        if (!MenuRepository.instance)
            MenuRepository.instance = new MenuRepository();
        return MenuRepository.instance;
    }

    public async read(
        params: IMenuReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IMenuDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.MENU}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IMenuEntity>(data);
                    if (entity)
                        return this.menuEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: IMenuSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IMenuDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.MENU, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IMenuEntity>(data);
                    if (entity)
                        return this.menuEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: IMenuUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IMenuDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.MENU, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IMenuEntity>(data);
                    if (entity)
                        return this.menuEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: IMenuDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IMenuDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.MENU}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IMenuEntity>(data);
                    if (entity)
                        return this.menuEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IMenuDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.MENU_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<IMenuEntity[]>(data);
                    if (entities)
                        return this.menuEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}