import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ICountryDTO } from "@platform/domain/models/apis/platform/entities/country";
import {
  ICountryDeleteEntity,
  ICountryReadEntity,
  ICountrySaveEntity,
  ICountryUpdateEntity,
} from "@platform/infrastructure/entities/apis/platform/entities/country";

export abstract class ICountryRepository {
  abstract read(params: ICountryReadEntity, config: IConfigDTO): Promise<ICountryDTO | null>;
  abstract save(params: ICountrySaveEntity, config: IConfigDTO): Promise<ICountryDTO | null>;
  abstract update(params: ICountryUpdateEntity, config: IConfigDTO): Promise<ICountryDTO | null>;
  abstract delete(params: ICountryDeleteEntity, config: IConfigDTO): Promise<ICountryDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<ICountryDTO[] | null>;
}