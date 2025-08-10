import { IConfigDTO } from "@bus/core/interfaces";
import platformAxios from "@bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";
import { CONST_CORE_DTO } from "@bus/core/const/const-core";
import { InjectionCore } from "@bus/core/injection/injection-core";
import { ITranslationRepository } from "@bus/domain/services/repositories/apis/platform/entities/i-translation-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ITranslationDTO } from "@bus/domain/models/apis/platform/entities/translation";
import { ITranslationDeleteEntity, ITranslationEntity, ITranslationReadEntity, ITranslationSaveEntity, ITranslationUpdateEntity } from "@bus/infrastructure/entities/apis/platform/entities/translation";
import { InjectionPlatformEntitiesTranslationMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-translation-mapper";

export class TranslationRepository extends ITranslationRepository {

    private static instance: TranslationRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly translationEntityMapper = InjectionPlatformEntitiesTranslationMapper.TranslationEntityMapper();

    private constructor() {
        super();
    }

    public static getInstance(): TranslationRepository {
        if (!TranslationRepository.instance)
            TranslationRepository.instance = new TranslationRepository();
        return TranslationRepository.instance;
    }

    public async read(
        params: ITranslationReadEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ITranslationDTO | null> {
        if (config.loadService)
            return platformAxios
                .get(`${CONST_PLATFORM_API_ROUTES.TRANSLATION}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ITranslationEntity>(data);
                    if (entity)
                        return this.translationEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async save(
        params: ITranslationSaveEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ITranslationDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.TRANSLATION, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ITranslationEntity>(data);
                    if (entity)
                        return this.translationEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async update(
        params: ITranslationUpdateEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ITranslationDTO | null> {
        if (config.loadService)
            return platformAxios
                .put(CONST_PLATFORM_API_ROUTES.TRANSLATION, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ITranslationEntity>(data);
                    if (entity)
                        return this.translationEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async delete(
        params: ITranslationDeleteEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ITranslationDTO | null> {
        if (config.loadService)
            return platformAxios
                .delete(`${CONST_PLATFORM_API_ROUTES.TRANSLATION}/${params.id}`)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<ITranslationEntity>(data);
                    if (entity)
                        return this.translationEntityMapper.mapFrom(entity);
                    return null;
                });
        return null;
    }

    public async list(
        params: IPaginationBackendDTO,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<ITranslationDTO[] | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.TRANSLATION_LIST, params)
                .then(({ data }) => {
                    const entities = this.resolve.ResolveRequest<ITranslationEntity[]>(data);
                    if (entities)
                        return this.translationEntityMapper.mapFromList(entities);
                    return null;
                });
        return null;
    }
}