import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IRolPermissionDTO, IRolPermissionUpdateDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import { InjectionPlatformEntitiesRolPermissionMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-rol-permission-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class RolPermissionUpdateUseCase implements UseCase<IRolPermissionUpdateDTO, IRolPermissionDTO | null> {
  private static instance: RolPermissionUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.RolPermissionRepository();
  private mapper = InjectionPlatformEntitiesRolPermissionMapper.RolPermissionUpdateMapper();

  public static getInstance(): RolPermissionUpdateUseCase {
    if (!RolPermissionUpdateUseCase.instance)
      RolPermissionUpdateUseCase.instance = new RolPermissionUpdateUseCase();
    return RolPermissionUpdateUseCase.instance;
  }

  public async execute(params: IRolPermissionUpdateDTO, config?: IConfigDTO): Promise<IRolPermissionDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}