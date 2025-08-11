import { Mapper } from "@bus/core/classes";
import { IApiTokenDeleteDTO } from "@platform/domain/models/apis/platform/entities/apitoken";
import { IApiTokenDeleteEntity } from "@platform/infrastructure/entities/apis/platform/entities/apitoken";

export class ApiTokenDeleteMapper extends Mapper<IApiTokenDeleteEntity, IApiTokenDeleteDTO> {

  private static instance: ApiTokenDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): ApiTokenDeleteMapper {
    if (!ApiTokenDeleteMapper.instance)
      ApiTokenDeleteMapper.instance = new ApiTokenDeleteMapper();
    return ApiTokenDeleteMapper.instance;
  }

  public mapFrom(param: IApiTokenDeleteEntity): IApiTokenDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IApiTokenDeleteEntity[]): IApiTokenDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IApiTokenDeleteDTO): IApiTokenDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IApiTokenDeleteDTO[]): IApiTokenDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}