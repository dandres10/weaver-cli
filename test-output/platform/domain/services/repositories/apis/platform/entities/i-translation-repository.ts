import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ITranslationDTO } from "@platform/domain/models/apis/platform/entities/translation";
import {
  ITranslationDeleteEntity,
  ITranslationReadEntity,
  ITranslationSaveEntity,
  ITranslationUpdateEntity,
} from "@platform/infrastructure/entities/apis/platform/entities/translation";

export abstract class ITranslationRepository {
  abstract read(params: ITranslationReadEntity, config: IConfigDTO): Promise<ITranslationDTO | null>;
  abstract save(params: ITranslationSaveEntity, config: IConfigDTO): Promise<ITranslationDTO | null>;
  abstract update(params: ITranslationUpdateEntity, config: IConfigDTO): Promise<ITranslationDTO | null>;
  abstract delete(params: ITranslationDeleteEntity, config: IConfigDTO): Promise<ITranslationDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<ITranslationDTO[] | null>;
}