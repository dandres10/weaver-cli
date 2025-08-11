import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IApiTokenDTO } from "@leon/domain/models/apis/leon/entities/apitoken";
import {
  IApiTokenDeleteEntity,
  IApiTokenReadEntity,
  IApiTokenSaveEntity,
  IApiTokenUpdateEntity,
} from "@leon/infrastructure/entities/apis/leon/entities/apitoken";

export abstract class IApiTokenRepository {
  abstract read(params: IApiTokenReadEntity, config: IConfigDTO): Promise<IApiTokenDTO | null>;
  abstract save(params: IApiTokenSaveEntity, config: IConfigDTO): Promise<IApiTokenDTO | null>;
  abstract update(params: IApiTokenUpdateEntity, config: IConfigDTO): Promise<IApiTokenDTO | null>;
  abstract delete(params: IApiTokenDeleteEntity, config: IConfigDTO): Promise<IApiTokenDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<IApiTokenDTO[] | null>;
}