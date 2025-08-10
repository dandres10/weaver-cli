import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IMenuPermissionDTO, IMenuPermissionDeleteDTO } from "@platform/domain/models/apis/platform/entities/menupermission";
import { InjectionPlatformEntitiesMenuPermissionMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-menu-permission-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class MenuPermissionDeleteUseCase implements UseCase<IMenuPermissionDeleteDTO, IMenuPermissionDTO | null> {
  private static instance: MenuPermissionDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.MenuPermissionRepository();
  private mapper = InjectionPlatformEntitiesMenuPermissionMapper.MenuPermissionDeleteMapper();

  public static getInstance(): MenuPermissionDeleteUseCase {
    if (!MenuPermissionDeleteUseCase.instance)
      MenuPermissionDeleteUseCase.instance = new MenuPermissionDeleteUseCase();
    return MenuPermissionDeleteUseCase.instance;
  }

  public async execute(params: IMenuPermissionDeleteDTO, config?: IConfigDTO): Promise<IMenuPermissionDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}