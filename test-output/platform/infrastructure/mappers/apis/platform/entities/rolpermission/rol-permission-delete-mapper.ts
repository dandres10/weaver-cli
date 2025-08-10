import { Mapper } from "@bus/core/classes";
import { IRolPermissionDeleteDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import { IRolPermissionDeleteEntity } from "@bus/infrastructure/entities/apis/platform/entities/rolpermission";

export class RolPermissionDeleteMapper extends Mapper<IRolPermissionDeleteEntity, IRolPermissionDeleteDTO> {

  private static instance: RolPermissionDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): RolPermissionDeleteMapper {
    if (!RolPermissionDeleteMapper.instance)
      RolPermissionDeleteMapper.instance = new RolPermissionDeleteMapper();
    return RolPermissionDeleteMapper.instance;
  }

  public mapFrom(param: IRolPermissionDeleteEntity): IRolPermissionDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IRolPermissionDeleteEntity[]): IRolPermissionDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IRolPermissionDeleteDTO): IRolPermissionDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IRolPermissionDeleteDTO[]): IRolPermissionDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}