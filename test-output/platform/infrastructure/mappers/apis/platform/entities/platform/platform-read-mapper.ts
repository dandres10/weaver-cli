import { Mapper } from "@bus/core/classes";
import { IPlatformReadDTO } from "@platform/domain/models/apis/platform/entities/platform";
import { IPlatformReadEntity } from "@platform/infrastructure/entities/apis/platform/entities/platform";

export class PlatformReadMapper extends Mapper<IPlatformReadEntity, IPlatformReadDTO> {

  private static instance: PlatformReadMapper;
  public constructor() { super(); }

  public static getInstance(): PlatformReadMapper {
    if (!PlatformReadMapper.instance)
      PlatformReadMapper.instance = new PlatformReadMapper();
    return PlatformReadMapper.instance;
  }

  public mapFrom(param: IPlatformReadEntity): IPlatformReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IPlatformReadEntity[]): IPlatformReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IPlatformReadDTO): IPlatformReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IPlatformReadDTO[]): IPlatformReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}