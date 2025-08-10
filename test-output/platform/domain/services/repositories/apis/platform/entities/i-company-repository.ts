import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ICompanyDTO } from "@platform/domain/models/apis/platform/entities/company";
import {
  ICompanyDeleteEntity,
  ICompanyReadEntity,
  ICompanySaveEntity,
  ICompanyUpdateEntity,
} from "@platform/infrastructure/entities/apis/platform/entities/company";

export abstract class ICompanyRepository {
  abstract read(params: ICompanyReadEntity, config: IConfigDTO): Promise<ICompanyDTO | null>;
  abstract save(params: ICompanySaveEntity, config: IConfigDTO): Promise<ICompanyDTO | null>;
  abstract update(params: ICompanyUpdateEntity, config: IConfigDTO): Promise<ICompanyDTO | null>;
  abstract delete(params: ICompanyDeleteEntity, config: IConfigDTO): Promise<ICompanyDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<ICompanyDTO[] | null>;
}