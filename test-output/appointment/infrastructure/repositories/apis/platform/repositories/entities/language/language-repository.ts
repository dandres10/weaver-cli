import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { ILanguageRepository } from "@platform/domain/services/repositories/apis/platform/entities/i-language-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ILanguageDTO } from "@platform/domain/models/apis/platform/entities/language";
import { ILanguageDeleteEntity, ILanguageEntity, ILanguageReadEntity, ILanguageSaveEntity, ILanguageUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/language";
import { InjectionPlatformEntitiesLanguageMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-language-mapper";

export class LanguageRepository extends ILanguageRepository {

    private static instance: LanguageRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly languageEntityMapper = InjectionPlatformEntitiesLanguageMapper.LanguageEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): LanguageRepository {
        if (!LanguageRepository.instance)
            LanguageRepository.instance = new LanguageRepository();
        return LanguageRepository.instance;
    }

    public async read(
        params: ILanguageReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ILanguageDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.LANGUAGE}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ILanguageEntity>(data);
                    if (entity)
                        return this.languageEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: ILanguageSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ILanguageDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.LANGUAGE, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ILanguageEntity>(data);
                    if (entity)
                        return this.languageEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: ILanguageUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ILanguageDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.LANGUAGE, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ILanguageEntity>(data);
                    if (entity)
                        return this.languageEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: ILanguageDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ILanguageDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.LANGUAGE}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ILanguageEntity>(data);
                    if (entity)
                        return this.languageEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ILanguageDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.LANGUAGE_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<ILanguageEntity[]>(data);
                    if (entities)
                        return this.languageEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}