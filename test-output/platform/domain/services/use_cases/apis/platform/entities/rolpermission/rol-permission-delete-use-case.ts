import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IRolPermissionDTO, IRolPermissionDeleteDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import { InjectionPlatformEntitiesRolPermissionMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-rol-permission-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class RolPermissionDeleteUseCase implements UseCase<IRolPermissionDeleteDTO, IRolPermissionDTO | null> {
  private static instance: RolPermissionDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.RolPermissionRepository();
  private mapper = InjectionPlatformEntitiesRolPermissionMapper.RolPermissionDeleteMapper();

  public static getInstance(): RolPermissionDeleteUseCase {
    if (!RolPermissionDeleteUseCase.instance)
      RolPermissionDeleteUseCase.instance = new RolPermissionDeleteUseCase();
    return RolPermissionDeleteUseCase.instance;
  }

  public async execute(params: IRolPermissionDeleteDTO, config?: IConfigDTO): Promise<IRolPermissionDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}