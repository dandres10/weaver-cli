import { Mapper } from "@bus/core/classes";
import { IPlatformDeleteDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { IPlatformDeleteEntity } from "@platform/infrastructure/entities/apis/platform/entities/platform";

export class PlatformDeleteMapper extends Mapper<IPlatformDeleteEntity, IPlatformDeleteDTO> {

  private static instance: PlatformDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): PlatformDeleteMapper {
    if (!PlatformDeleteMapper.instance)
      PlatformDeleteMapper.instance = new PlatformDeleteMapper();
    return PlatformDeleteMapper.instance;
  }

  public mapFrom(param: IPlatformDeleteEntity): IPlatformDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IPlatformDeleteEntity[]): IPlatformDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IPlatformDeleteDTO): IPlatformDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IPlatformDeleteDTO[]): IPlatformDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}