import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IMenuPermissionDTO, IMenuPermissionSaveDTO } from "@platform/domain/models/apis/platform/entities/menupermission";
import { InjectionPlatformEntitiesMenuPermissionMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-menu-permission-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class MenuPermissionSaveUseCase implements UseCase<IMenuPermissionSaveDTO, IMenuPermissionDTO | null> {
  private static instance: MenuPermissionSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.MenuPermissionRepository();
  private mapper = InjectionPlatformEntitiesMenuPermissionMapper.MenuPermissionSaveMapper();

  public static getInstance(): MenuPermissionSaveUseCase {
    if (!MenuPermissionSaveUseCase.instance)
      MenuPermissionSaveUseCase.instance = new MenuPermissionSaveUseCase();
    return MenuPermissionSaveUseCase.instance;
  }

  public async execute(params: IMenuPermissionSaveDTO, config?: IConfigDTO): Promise<IMenuPermissionDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}