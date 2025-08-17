import { Mapper } from "@bus/core/classes";
import { IApiTokenDTO } from "@platform/domain/models/apis/platform/entities/apitoken";
import { IApiTokenEntity } from "@platform/infrastructure/entities/apis/platform/entities/apitoken";

export class ApiTokenEntityMapper extends Mapper<IApiTokenEntity, IApiTokenDTO> {
  private static instance: ApiTokenEntityMapper;
  public constructor() { super(); }

  public static getInstance(): ApiTokenEntityMapper {
    if (!ApiTokenEntityMapper.instance)
      ApiTokenEntityMapper.instance = new ApiTokenEntityMapper();
    return ApiTokenEntityMapper.instance;
  }

  public mapFrom(param: IApiTokenEntity): IApiTokenDTO {
    return {
      id: param.id,
      id: param.id,
      rolId: param.rol_id,
      token: param.token,
      state: param.state
    };
  }

  public mapFromList(params: IApiTokenEntity[]): IApiTokenDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IApiTokenDTO): IApiTokenEntity {
    return {
      id: param.id,
      id: param.id,
      rol_id: param.rolId,
      token: param.token,
      state: param.state
    };
  }

  public mapToList(params: IApiTokenDTO[]): IApiTokenEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}