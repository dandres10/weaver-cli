import { Mapper } from "@bus/core/classes";
import { IMenuPermissionDTO } from "@platform/domain/models/apis/platform/entities/menupermission";
import { IMenuPermissionEntity } from "@platform/infrastructure/entities/apis/platform/entities/menupermission";

export class MenuPermissionEntityMapper extends Mapper<IMenuPermissionEntity, IMenuPermissionDTO> {
  private static instance: MenuPermissionEntityMapper;
  public constructor() { super(); }

  public static getInstance(): MenuPermissionEntityMapper {
    if (!MenuPermissionEntityMapper.instance)
      MenuPermissionEntityMapper.instance = new MenuPermissionEntityMapper();
    return MenuPermissionEntityMapper.instance;
  }

  public mapFrom(param: IMenuPermissionEntity): IMenuPermissionDTO {
    return {
      menuId: param.menu_id,
      permissionId: param.permission_id,
      state: param.state
    };
  }

  public mapFromList(params: IMenuPermissionEntity[]): IMenuPermissionDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IMenuPermissionDTO): IMenuPermissionEntity {
    return {
      menu_id: param.menuId,
      permission_id: param.permissionId,
      state: param.state
    };
  }

  public mapToList(params: IMenuPermissionDTO[]): IMenuPermissionEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}