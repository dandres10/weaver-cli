import { Mapper } from "@bus/core/classes";
import { IMenuPermissionReadDTO } from "@platform/domain/models/apis/platform/entities/menupermission";
import { IMenuPermissionReadEntity } from "@platform/infrastructure/entities/apis/platform/entities/menupermission";

export class MenuPermissionReadMapper extends Mapper<IMenuPermissionReadEntity, IMenuPermissionReadDTO> {

  private static instance: MenuPermissionReadMapper;
  public constructor() { super(); }

  public static getInstance(): MenuPermissionReadMapper {
    if (!MenuPermissionReadMapper.instance)
      MenuPermissionReadMapper.instance = new MenuPermissionReadMapper();
    return MenuPermissionReadMapper.instance;
  }

  public mapFrom(param: IMenuPermissionReadEntity): IMenuPermissionReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IMenuPermissionReadEntity[]): IMenuPermissionReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IMenuPermissionReadDTO): IMenuPermissionReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IMenuPermissionReadDTO[]): IMenuPermissionReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}