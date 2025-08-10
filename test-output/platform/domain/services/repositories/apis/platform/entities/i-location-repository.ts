import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ILocationDTO } from "@platform/domain/models/apis/platform/entities/location";
import {
  ILocationDeleteEntity,
  ILocationReadEntity,
  ILocationSaveEntity,
  ILocationUpdateEntity,
} from "@platform/infrastructure/entities/apis/platform/entities/location";

export abstract class ILocationRepository {
  abstract read(params: ILocationReadEntity, config: IConfigDTO): Promise<ILocationDTO | null>;
  abstract save(params: ILocationSaveEntity, config: IConfigDTO): Promise<ILocationDTO | null>;
  abstract update(params: ILocationUpdateEntity, config: IConfigDTO): Promise<ILocationDTO | null>;
  abstract delete(params: ILocationDeleteEntity, config: IConfigDTO): Promise<ILocationDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<ILocationDTO[] | null>;
}