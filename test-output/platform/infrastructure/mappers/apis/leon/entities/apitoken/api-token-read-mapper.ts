import { Mapper } from "@bus/core/classes";
import { IApiTokenReadDTO } from "@leon/domain/models/apis/leon/entities/apitoken";
import { IApiTokenReadEntity } from "@leon/infrastructure/entities/apis/leon/entities/apitoken";

export class ApiTokenReadMapper extends Mapper<IApiTokenReadEntity, IApiTokenReadDTO> {

  private static instance: ApiTokenReadMapper;
  public constructor() { super(); }

  public static getInstance(): ApiTokenReadMapper {
    if (!ApiTokenReadMapper.instance)
      ApiTokenReadMapper.instance = new ApiTokenReadMapper();
    return ApiTokenReadMapper.instance;
  }

  public mapFrom(param: IApiTokenReadEntity): IApiTokenReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IApiTokenReadEntity[]): IApiTokenReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IApiTokenReadDTO): IApiTokenReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IApiTokenReadDTO[]): IApiTokenReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}