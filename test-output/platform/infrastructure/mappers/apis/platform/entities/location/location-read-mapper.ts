import { Mapper } from "@bus/core/classes";
import { ILocationReadDTO } from "@platform/domain/models/apis/platform/entities/location";
import { ILocationReadEntity } from "@platform/infrastructure/entities/apis/platform/entities/location";

export class LocationReadMapper extends Mapper<ILocationReadEntity, ILocationReadDTO> {

  private static instance: LocationReadMapper;
  public constructor() { super(); }

  public static getInstance(): LocationReadMapper {
    if (!LocationReadMapper.instance)
      LocationReadMapper.instance = new LocationReadMapper();
    return LocationReadMapper.instance;
  }

  public mapFrom(param: ILocationReadEntity): ILocationReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ILocationReadEntity[]): ILocationReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ILocationReadDTO): ILocationReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ILocationReadDTO[]): ILocationReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}