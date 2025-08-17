import { Mapper } from "@bus/core/classes";
import { IApiTokenUpdateDTO } from "@platform/domain/models/apis/platform/entities/apitoken";
import { IApiTokenUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/apitoken";

export class ApiTokenUpdateMapper extends Mapper<IApiTokenUpdateEntity, IApiTokenUpdateDTO> {

  private static instance: ApiTokenUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): ApiTokenUpdateMapper {
    if (!ApiTokenUpdateMapper.instance)
      ApiTokenUpdateMapper.instance = new ApiTokenUpdateMapper();
    return ApiTokenUpdateMapper.instance;
  }

  public mapFrom(param: IApiTokenUpdateEntity): IApiTokenUpdateDTO {
    return {
      id: param.id,
      rolId: param.rol_id,
      token: param.token,
      state: param.state
    };
  }

  public mapFromList(params: IApiTokenUpdateEntity[]): IApiTokenUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IApiTokenUpdateDTO): IApiTokenUpdateEntity {
    return {
      id: param.id,
      rol_id: param.rolId,
      token: param.token,
      state: param.state
    };
  }

  public mapToList(params: IApiTokenUpdateDTO[]): IApiTokenUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}