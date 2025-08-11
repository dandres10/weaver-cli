import { Mapper } from "@bus/core/classes";
import { IApiTokenSaveDTO } from "@platform/domain/models/apis/platform/entities/apitoken";
import { IApiTokenSaveEntity } from "@platform/infrastructure/entities/apis/platform/entities/apitoken";

export class ApiTokenSaveMapper extends Mapper<IApiTokenSaveEntity, IApiTokenSaveDTO> {

  private static instance: ApiTokenSaveMapper;
  public constructor() { super(); }

  public static getInstance(): ApiTokenSaveMapper {
    if (!ApiTokenSaveMapper.instance)
      ApiTokenSaveMapper.instance = new ApiTokenSaveMapper();
    return ApiTokenSaveMapper.instance;
  }

  public mapFrom(param: IApiTokenSaveEntity): IApiTokenSaveDTO {
    return {
      rolId: param.rol_id,
      token: param.token,
      state: param.state
    };
  }

  public mapFromList(params: IApiTokenSaveEntity[]): IApiTokenSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IApiTokenSaveDTO): IApiTokenSaveEntity {
    return {
      rol_id: param.rolId,
      token: param.token,
      state: param.state ?? true
    };
  }

  public mapToList(params: IApiTokenSaveDTO[]): IApiTokenSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}