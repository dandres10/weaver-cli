import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ILanguageDTO } from "@platform/domain/models/apis/platform/entities/language";
import {
  ILanguageDeleteEntity,
  ILanguageReadEntity,
  ILanguageSaveEntity,
  ILanguageUpdateEntity,
} from "@platform/infrastructure/entities/apis/platform/entities/language";

export abstract class ILanguageRepository {
  abstract read(params: ILanguageReadEntity, config: IConfigDTO): Promise<ILanguageDTO | null>;
  abstract save(params: ILanguageSaveEntity, config: IConfigDTO): Promise<ILanguageDTO | null>;
  abstract update(params: ILanguageUpdateEntity, config: IConfigDTO): Promise<ILanguageDTO | null>;
  abstract delete(params: ILanguageDeleteEntity, config: IConfigDTO): Promise<ILanguageDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<ILanguageDTO[] | null>;
}