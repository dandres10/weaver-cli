import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ITestUserDTO } from "@platform/domain/models/apis/platform/entities/testuser";
import {
  ITestUserDeleteEntity,
  ITestUserReadEntity,
  ITestUserSaveEntity,
  ITestUserUpdateEntity,
} from "@platform/infrastructure/entities/apis/platform/entities/testuser";

export abstract class ITestUserRepository {
  abstract read(params: ITestUserReadEntity, config: IConfigDTO): Promise<ITestUserDTO | null>;
  abstract save(params: ITestUserSaveEntity, config: IConfigDTO): Promise<ITestUserDTO | null>;
  abstract update(params: ITestUserUpdateEntity, config: IConfigDTO): Promise<ITestUserDTO | null>;
  abstract delete(params: ITestUserDeleteEntity, config: IConfigDTO): Promise<ITestUserDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<ITestUserDTO[] | null>;
}