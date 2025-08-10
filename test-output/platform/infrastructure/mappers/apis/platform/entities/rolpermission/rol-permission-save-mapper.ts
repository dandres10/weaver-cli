import { Mapper } from "@bus/core/classes";
import { IRolPermissionSaveDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import { IRolPermissionSaveEntity } from "@bus/infrastructure/entities/apis/platform/entities/rolpermission";

export class RolPermissionSaveMapper extends Mapper<IRolPermissionSaveEntity, IRolPermissionSaveDTO> {

  private static instance: RolPermissionSaveMapper;
  public constructor() { super(); }

  public static getInstance(): RolPermissionSaveMapper {
    if (!RolPermissionSaveMapper.instance)
      RolPermissionSaveMapper.instance = new RolPermissionSaveMapper();
    return RolPermissionSaveMapper.instance;
  }

  public mapFrom(param: IRolPermissionSaveEntity): IRolPermissionSaveDTO {
    return {
      rolId: param.rol_id,
      permissionId: param.permission_id,
      state: param.state
    };
  }

  public mapFromList(params: IRolPermissionSaveEntity[]): IRolPermissionSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IRolPermissionSaveDTO): IRolPermissionSaveEntity {
    return {
      rol_id: param.rolId,
      permission_id: param.permissionId,
      state: param.state ?? true
    };
  }

  public mapToList(params: IRolPermissionSaveDTO[]): IRolPermissionSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}