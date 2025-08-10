import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { ICountryRepository } from "@bus/domain/services/repositories/apis/platform/entities/i-country-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ICountryDTO } from "@bus/domain/models/apis/platform/entities/country";
import { ICountryDeleteEntity, ICountryEntity, ICountryReadEntity, ICountrySaveEntity, ICountryUpdateEntity } from "@bus/infrastructure/entities/apis/platform/entities/country";
import { InjectionPlatformEntitiesCountryMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-country-mapper";

export class CountryRepository extends ICountryRepository {

    private static instance: CountryRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly countryEntityMapper = InjectionPlatformEntitiesCountryMapper.CountryEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): CountryRepository {
        if (!CountryRepository.instance)
            CountryRepository.instance = new CountryRepository();
        return CountryRepository.instance;
    }

    public async read(
        params: ICountryReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICountryDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.COUNTRY}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICountryEntity>(data);
                    if (entity)
                        return this.countryEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: ICountrySaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICountryDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.COUNTRY, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICountryEntity>(data);
                    if (entity)
                        return this.countryEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: ICountryUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICountryDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.COUNTRY, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICountryEntity>(data);
                    if (entity)
                        return this.countryEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: ICountryDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICountryDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.COUNTRY}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ICountryEntity>(data);
                    if (entity)
                        return this.countryEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ICountryDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.COUNTRY_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<ICountryEntity[]>(data);
                    if (entities)
                        return this.countryEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}