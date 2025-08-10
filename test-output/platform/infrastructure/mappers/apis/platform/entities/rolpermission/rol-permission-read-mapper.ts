import { Mapper } from "@bus/core/classes";
import { IRolPermissionReadDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import { IRolPermissionReadEntity } from "@bus/infrastructure/entities/apis/platform/entities/rolpermission";

export class RolPermissionReadMapper extends Mapper<IRolPermissionReadEntity, IRolPermissionReadDTO> {

  private static instance: RolPermissionReadMapper;
  public constructor() { super(); }

  public static getInstance(): RolPermissionReadMapper {
    if (!RolPermissionReadMapper.instance)
      RolPermissionReadMapper.instance = new RolPermissionReadMapper();
    return RolPermissionReadMapper.instance;
  }

  public mapFrom(param: IRolPermissionReadEntity): IRolPermissionReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IRolPermissionReadEntity[]): IRolPermissionReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IRolPermissionReadDTO): IRolPermissionReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IRolPermissionReadDTO[]): IRolPermissionReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}