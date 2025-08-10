import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { ITestUserRepository } from "@platform/domain/services/repositories/apis/platform/entities/i-test-user-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ITestUserDTO } from "@platform/domain/models/apis/platform/entities/testuser";
import { ITestUserDeleteEntity, ITestUserEntity, ITestUserReadEntity, ITestUserSaveEntity, ITestUserUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/testuser";
import { InjectionPlatformEntitiesTestUserMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-test-user-mapper";

export class TestUserRepository extends ITestUserRepository {

    private static instance: TestUserRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly testuserEntityMapper = InjectionPlatformEntitiesTestUserMapper.TestUserEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): TestUserRepository {
        if (!TestUserRepository.instance)
            TestUserRepository.instance = new TestUserRepository();
        return TestUserRepository.instance;
    }

    public async read(
        params: ITestUserReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ITestUserDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.TESTUSER}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ITestUserEntity>(data);
                    if (entity)
                        return this.testuserEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: ITestUserSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ITestUserDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.TESTUSER, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ITestUserEntity>(data);
                    if (entity)
                        return this.testuserEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: ITestUserUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ITestUserDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.TESTUSER, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ITestUserEntity>(data);
                    if (entity)
                        return this.testuserEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: ITestUserDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ITestUserDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.TESTUSER}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ITestUserEntity>(data);
                    if (entity)
                        return this.testuserEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ITestUserDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.TESTUSER_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<ITestUserEntity[]>(data);
                    if (entities)
                        return this.testuserEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}