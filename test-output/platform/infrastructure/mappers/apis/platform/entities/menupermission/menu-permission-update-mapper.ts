import { Mapper } from "@bus/core/classes";
import { IMenuPermissionUpdateDTO } from "@platform/domain/models/apis/platform/entities/menupermission";
import { IMenuPermissionUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/menupermission";

export class MenuPermissionUpdateMapper extends Mapper<IMenuPermissionUpdateEntity, IMenuPermissionUpdateDTO> {

  private static instance: MenuPermissionUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): MenuPermissionUpdateMapper {
    if (!MenuPermissionUpdateMapper.instance)
      MenuPermissionUpdateMapper.instance = new MenuPermissionUpdateMapper();
    return MenuPermissionUpdateMapper.instance;
  }

  public mapFrom(param: IMenuPermissionUpdateEntity): IMenuPermissionUpdateDTO {
    return {
      menuId: param.menu_id,
      permissionId: param.permission_id,
      state: param.state
    };
  }

  public mapFromList(params: IMenuPermissionUpdateEntity[]): IMenuPermissionUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IMenuPermissionUpdateDTO): IMenuPermissionUpdateEntity {
    return {
      menu_id: param.menuId,
      permission_id: param.permissionId,
      state: param.state
    };
  }

  public mapToList(params: IMenuPermissionUpdateDTO[]): IMenuPermissionUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}