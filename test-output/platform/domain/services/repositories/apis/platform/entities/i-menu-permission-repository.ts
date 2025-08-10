import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IMenuPermissionDTO } from "@platform/domain/models/apis/platform/entities/menupermission";
import {
  IMenuPermissionDeleteEntity,
  IMenuPermissionReadEntity,
  IMenuPermissionSaveEntity,
  IMenuPermissionUpdateEntity,
} from "@platform/infrastructure/entities/apis/platform/entities/menupermission";

export abstract class IMenuPermissionRepository {
  abstract read(params: IMenuPermissionReadEntity, config: IConfigDTO): Promise<IMenuPermissionDTO | null>;
  abstract save(params: IMenuPermissionSaveEntity, config: IConfigDTO): Promise<IMenuPermissionDTO | null>;
  abstract update(params: IMenuPermissionUpdateEntity, config: IConfigDTO): Promise<IMenuPermissionDTO | null>;
  abstract delete(params: IMenuPermissionDeleteEntity, config: IConfigDTO): Promise<IMenuPermissionDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<IMenuPermissionDTO[] | null>;
}