import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { IUserRepository } from "@bus/domain/services/repositories/apis/platform/entities/i-user-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IUserDTO } from "@bus/domain/models/apis/platform/entities/user";
import { IUserDeleteEntity, IUserEntity, IUserReadEntity, IUserSaveEntity, IUserUpdateEntity } from "@bus/infrastructure/entities/apis/platform/entities/user";
import { InjectionPlatformEntitiesUserMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-user-mapper";

export class UserRepository extends IUserRepository {

    private static instance: UserRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly userEntityMapper = InjectionPlatformEntitiesUserMapper.UserEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): UserRepository {
        if (!UserRepository.instance)
            UserRepository.instance = new UserRepository();
        return UserRepository.instance;
    }

    public async read(
        params: IUserReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IUserDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.USER}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IUserEntity>(data);
                    if (entity)
                        return this.userEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: IUserSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IUserDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.USER, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IUserEntity>(data);
                    if (entity)
                        return this.userEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: IUserUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IUserDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.USER, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IUserEntity>(data);
                    if (entity)
                        return this.userEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: IUserDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IUserDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.USER}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IUserEntity>(data);
                    if (entity)
                        return this.userEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IUserDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.USER_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<IUserEntity[]>(data);
                    if (entities)
                        return this.userEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}