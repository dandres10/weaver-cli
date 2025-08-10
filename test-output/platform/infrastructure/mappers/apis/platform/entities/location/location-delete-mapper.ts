import { Mapper } from "@bus/core/classes";
import { ILocationDeleteDTO } from "@platform/domain/models/apis/platform/entities/location";
import { ILocationDeleteEntity } from "@platform/infrastructure/entities/apis/platform/entities/location";

export class LocationDeleteMapper extends Mapper<ILocationDeleteEntity, ILocationDeleteDTO> {

  private static instance: LocationDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): LocationDeleteMapper {
    if (!LocationDeleteMapper.instance)
      LocationDeleteMapper.instance = new LocationDeleteMapper();
    return LocationDeleteMapper.instance;
  }

  public mapFrom(param: ILocationDeleteEntity): ILocationDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ILocationDeleteEntity[]): ILocationDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ILocationDeleteDTO): ILocationDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ILocationDeleteDTO[]): ILocationDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}