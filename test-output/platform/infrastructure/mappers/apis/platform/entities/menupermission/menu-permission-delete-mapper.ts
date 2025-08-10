import { Mapper } from "@bus/core/classes";
import { IMenuPermissionDeleteDTO } from "@platform/domain/models/apis/platform/entities/menupermission";
import { IMenuPermissionDeleteEntity } from "@platform/infrastructure/entities/apis/platform/entities/menupermission";

export class MenuPermissionDeleteMapper extends Mapper<IMenuPermissionDeleteEntity, IMenuPermissionDeleteDTO> {

  private static instance: MenuPermissionDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): MenuPermissionDeleteMapper {
    if (!MenuPermissionDeleteMapper.instance)
      MenuPermissionDeleteMapper.instance = new MenuPermissionDeleteMapper();
    return MenuPermissionDeleteMapper.instance;
  }

  public mapFrom(param: IMenuPermissionDeleteEntity): IMenuPermissionDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IMenuPermissionDeleteEntity[]): IMenuPermissionDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IMenuPermissionDeleteDTO): IMenuPermissionDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IMenuPermissionDeleteDTO[]): IMenuPermissionDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}