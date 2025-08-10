import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IUserDTO } from "@bus/domain/models/apis/platform/entities/user";
import {
  IUserDeleteEntity,
  IUserReadEntity,
  IUserSaveEntity,
  IUserUpdateEntity,
} from "@bus/infrastructure/entities/apis/platform/entities/user";

export abstract class IUserRepository {
  abstract read(params: IUserReadEntity, config: IConfigDTO): Promise<IUserDTO | null>;
  abstract save(params: IUserSaveEntity, config: IConfigDTO): Promise<IUserDTO | null>;
  abstract update(params: IUserUpdateEntity, config: IConfigDTO): Promise<IUserDTO | null>;
  abstract delete(params: IUserDeleteEntity, config: IConfigDTO): Promise<IUserDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<IUserDTO[] | null>;
}