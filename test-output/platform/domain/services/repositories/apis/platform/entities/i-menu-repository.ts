import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IMenuDTO } from "@bus/domain/models/apis/platform/entities/menu";
import {
  IMenuDeleteEntity,
  IMenuReadEntity,
  IMenuSaveEntity,
  IMenuUpdateEntity,
} from "@bus/infrastructure/entities/apis/platform/entities/menu";

export abstract class IMenuRepository {
  abstract read(params: IMenuReadEntity, config: IConfigDTO): Promise<IMenuDTO | null>;
  abstract save(params: IMenuSaveEntity, config: IConfigDTO): Promise<IMenuDTO | null>;
  abstract update(params: IMenuUpdateEntity, config: IConfigDTO): Promise<IMenuDTO | null>;
  abstract delete(params: IMenuDeleteEntity, config: IConfigDTO): Promise<IMenuDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<IMenuDTO[] | null>;
}