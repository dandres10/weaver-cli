import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IRolPermissionDTO, IRolPermissionReadDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import { InjectionPlatformEntitiesRolPermissionMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-rol-permission-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class RolPermissionReadUseCase implements UseCase<IRolPermissionReadDTO, IRolPermissionDTO | null> {
  private static instance: RolPermissionReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.RolPermissionRepository();
  private mapper = InjectionPlatformEntitiesRolPermissionMapper.RolPermissionReadMapper();

  public static getInstance(): RolPermissionReadUseCase {
    if (!RolPermissionReadUseCase.instance)
      RolPermissionReadUseCase.instance = new RolPermissionReadUseCase();
    return RolPermissionReadUseCase.instance;
  }

  public async execute(params: IRolPermissionReadDTO, config?: IConfigDTO): Promise<IRolPermissionDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}