import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IPlatformDTO } from "@platform/domain/models/apis/platform/entities/platform";
import {
  IPlatformDeleteEntity,
  IPlatformReadEntity,
  IPlatformSaveEntity,
  IPlatformUpdateEntity,
} from "@platform/infrastructure/entities/apis/platform/entities/platform";

export abstract class IPlatformRepository {
  abstract read(params: IPlatformReadEntity, config: IConfigDTO): Promise<IPlatformDTO | null>;
  abstract save(params: IPlatformSaveEntity, config: IConfigDTO): Promise<IPlatformDTO | null>;
  abstract update(params: IPlatformUpdateEntity, config: IConfigDTO): Promise<IPlatformDTO | null>;
  abstract delete(params: IPlatformDeleteEntity, config: IConfigDTO): Promise<IPlatformDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<IPlatformDTO[] | null>;
}