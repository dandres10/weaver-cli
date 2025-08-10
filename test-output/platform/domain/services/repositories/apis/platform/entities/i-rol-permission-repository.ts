import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IRolPermissionDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import {
  IRolPermissionDeleteEntity,
  IRolPermissionReadEntity,
  IRolPermissionSaveEntity,
  IRolPermissionUpdateEntity,
} from "@bus/infrastructure/entities/apis/platform/entities/rolpermission";

export abstract class IRolPermissionRepository {
  abstract read(params: IRolPermissionReadEntity, config: IConfigDTO): Promise<IRolPermissionDTO | null>;
  abstract save(params: IRolPermissionSaveEntity, config: IConfigDTO): Promise<IRolPermissionDTO | null>;
  abstract update(params: IRolPermissionUpdateEntity, config: IConfigDTO): Promise<IRolPermissionDTO | null>;
  abstract delete(params: IRolPermissionDeleteEntity, config: IConfigDTO): Promise<IRolPermissionDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<IRolPermissionDTO[] | null>;
}