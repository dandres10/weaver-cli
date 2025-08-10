import { Mapper } from "@bus/core/classes";
import { IMenuPermissionSaveDTO } from "@platform/domain/models/apis/platform/entities/menupermission";
import { IMenuPermissionSaveEntity } from "@platform/infrastructure/entities/apis/platform/entities/menupermission";

export class MenuPermissionSaveMapper extends Mapper<IMenuPermissionSaveEntity, IMenuPermissionSaveDTO> {

  private static instance: MenuPermissionSaveMapper;
  public constructor() { super(); }

  public static getInstance(): MenuPermissionSaveMapper {
    if (!MenuPermissionSaveMapper.instance)
      MenuPermissionSaveMapper.instance = new MenuPermissionSaveMapper();
    return MenuPermissionSaveMapper.instance;
  }

  public mapFrom(param: IMenuPermissionSaveEntity): IMenuPermissionSaveDTO {
    return {
      menuId: param.menu_id,
      permissionId: param.permission_id,
      state: param.state
    };
  }

  public mapFromList(params: IMenuPermissionSaveEntity[]): IMenuPermissionSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IMenuPermissionSaveDTO): IMenuPermissionSaveEntity {
    return {
      menu_id: param.menuId,
      permission_id: param.permissionId,
      state: param.state ?? true
    };
  }

  public mapToList(params: IMenuPermissionSaveDTO[]): IMenuPermissionSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}