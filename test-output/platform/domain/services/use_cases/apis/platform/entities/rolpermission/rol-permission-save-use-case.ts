import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IRolPermissionDTO, IRolPermissionSaveDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import { InjectionPlatformEntitiesRolPermissionMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-rol-permission-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class RolPermissionSaveUseCase implements UseCase<IRolPermissionSaveDTO, IRolPermissionDTO | null> {
  private static instance: RolPermissionSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.RolPermissionRepository();
  private mapper = InjectionPlatformEntitiesRolPermissionMapper.RolPermissionSaveMapper();

  public static getInstance(): RolPermissionSaveUseCase {
    if (!RolPermissionSaveUseCase.instance)
      RolPermissionSaveUseCase.instance = new RolPermissionSaveUseCase();
    return RolPermissionSaveUseCase.instance;
  }

  public async execute(params: IRolPermissionSaveDTO, config?: IConfigDTO): Promise<IRolPermissionDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}