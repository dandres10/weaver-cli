import { Mapper } from "@bus/core/classes";
import { IRolPermissionDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import { IRolPermissionEntity } from "@bus/infrastructure/entities/apis/platform/entities/rolpermission";

export class RolPermissionEntityMapper extends Mapper<IRolPermissionEntity, IRolPermissionDTO> {
  private static instance: RolPermissionEntityMapper;
  public constructor() { super(); }

  public static getInstance(): RolPermissionEntityMapper {
    if (!RolPermissionEntityMapper.instance)
      RolPermissionEntityMapper.instance = new RolPermissionEntityMapper();
    return RolPermissionEntityMapper.instance;
  }

  public mapFrom(param: IRolPermissionEntity): IRolPermissionDTO {
    return {
      rolId: param.rol_id,
      permissionId: param.permission_id,
      state: param.state
    };
  }

  public mapFromList(params: IRolPermissionEntity[]): IRolPermissionDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IRolPermissionDTO): IRolPermissionEntity {
    return {
      rol_id: param.rolId,
      permission_id: param.permissionId,
      state: param.state
    };
  }

  public mapToList(params: IRolPermissionDTO[]): IRolPermissionEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}