import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { IServiceCompanyRepository } from "@appointment/domain/services/repositories/apis/appointment/entities/i-service-company-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IServiceCompanyDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import { IServiceCompanyDeleteEntity, IServiceCompanyEntity, IServiceCompanyReadEntity, IServiceCompanySaveEntity, IServiceCompanyUpdateEntity } from "@appointment/infrastructure/entities/apis/appointment/entities/servicecompany";
import { InjectionPlatformEntitiesServiceCompanyMapper } from "@appointment/infrastructure/mappers/apis/appointment/injection/entities/injection-appointment-entities-service-company-mapper";

export class ServiceCompanyRepository extends IServiceCompanyRepository {

    private static instance: ServiceCompanyRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly servicecompanyEntityMapper = InjectionPlatformEntitiesServiceCompanyMapper.ServiceCompanyEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): ServiceCompanyRepository {
        if (!ServiceCompanyRepository.instance)
            ServiceCompanyRepository.instance = new ServiceCompanyRepository();
        return ServiceCompanyRepository.instance;
    }

    public async read(
        params: IServiceCompanyReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IServiceCompanyDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.SERVICECOMPANY}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IServiceCompanyEntity>(data);
                    if (entity)
                        return this.servicecompanyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: IServiceCompanySaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IServiceCompanyDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.SERVICECOMPANY, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IServiceCompanyEntity>(data);
                    if (entity)
                        return this.servicecompanyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: IServiceCompanyUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IServiceCompanyDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.SERVICECOMPANY, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IServiceCompanyEntity>(data);
                    if (entity)
                        return this.servicecompanyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: IServiceCompanyDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IServiceCompanyDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.SERVICECOMPANY}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IServiceCompanyEntity>(data);
                    if (entity)
                        return this.servicecompanyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IServiceCompanyDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.SERVICECOMPANY_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<IServiceCompanyEntity[]>(data);
                    if (entities)
                        return this.servicecompanyEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}