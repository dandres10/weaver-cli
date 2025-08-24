import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IServiceCompanyDTO } from "@appointment/domain/models/apis/appointment/entities/servicecompany";
import {
  IServiceCompanyDeleteEntity,
  IServiceCompanyReadEntity,
  IServiceCompanySaveEntity,
  IServiceCompanyUpdateEntity,
} from "@appointment/infrastructure/entities/apis/appointment/entities/servicecompany";

export abstract class IServiceCompanyRepository {
  abstract read(params: IServiceCompanyReadEntity, config: IConfigDTO): Promise<IServiceCompanyDTO | null>;
  abstract save(params: IServiceCompanySaveEntity, config: IConfigDTO): Promise<IServiceCompanyDTO | null>;
  abstract update(params: IServiceCompanyUpdateEntity, config: IConfigDTO): Promise<IServiceCompanyDTO | null>;
  abstract delete(params: IServiceCompanyDeleteEntity, config: IConfigDTO): Promise<IServiceCompanyDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<IServiceCompanyDTO[] | null>;
}