import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { ICompanyRepository } from "@platform/domain/services/repositories/apis/platform/entities/i-company-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ICompanyDTO } from "@platform/domain/models/apis/platform/entities/company";
import { ICompanyDeleteEntity, ICompanyEntity, ICompanyReadEntity, ICompanySaveEntity, ICompanyUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/company";
import { InjectionPlatformEntitiesCompanyMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-company-mapper";

export class CompanyRepository extends ICompanyRepository {

    private static instance: CompanyRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly companyEntityMapper = InjectionPlatformEntitiesCompanyMapper.CompanyEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): CompanyRepository {
        if (!CompanyRepository.instance)
            CompanyRepository.instance = new CompanyRepository();
        return CompanyRepository.instance;
    }

    public async read(
        params: ICompanyReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICompanyDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.COMPANY}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICompanyEntity>(data);
                    if (entity)
                        return this.companyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: ICompanySaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICompanyDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.COMPANY, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICompanyEntity>(data);
                    if (entity)
                        return this.companyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: ICompanyUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICompanyDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.COMPANY, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICompanyEntity>(data);
                    if (entity)
                        return this.companyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: ICompanyDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICompanyDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.COMPANY}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICompanyEntity>(data);
                    if (entity)
                        return this.companyEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICompanyDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.COMPANY_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<ICompanyEntity[]>(data);
                    if (entities)
                        return this.companyEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}