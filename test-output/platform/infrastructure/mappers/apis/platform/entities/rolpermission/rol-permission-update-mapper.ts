import { Mapper } from "@bus/core/classes";
import { IRolPermissionUpdateDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import { IRolPermissionUpdateEntity } from "@bus/infrastructure/entities/apis/platform/entities/rolpermission";

export class RolPermissionUpdateMapper extends Mapper<IRolPermissionUpdateEntity, IRolPermissionUpdateDTO> {

  private static instance: RolPermissionUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): RolPermissionUpdateMapper {
    if (!RolPermissionUpdateMapper.instance)
      RolPermissionUpdateMapper.instance = new RolPermissionUpdateMapper();
    return RolPermissionUpdateMapper.instance;
  }

  public mapFrom(param: IRolPermissionUpdateEntity): IRolPermissionUpdateDTO {
    return {
      rolId: param.rol_id,
      permissionId: param.permission_id,
      state: param.state
    };
  }

  public mapFromList(params: IRolPermissionUpdateEntity[]): IRolPermissionUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IRolPermissionUpdateDTO): IRolPermissionUpdateEntity {
    return {
      rol_id: param.rolId,
      permission_id: param.permissionId,
      state: param.state
    };
  }

  public mapToList(params: IRolPermissionUpdateDTO[]): IRolPermissionUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}