import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IMenuPermissionDTO, IMenuPermissionUpdateDTO } from "@platform/domain/models/apis/platform/entities/menupermission";
import { InjectionPlatformEntitiesMenuPermissionMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-menu-permission-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class MenuPermissionUpdateUseCase implements UseCase<IMenuPermissionUpdateDTO, IMenuPermissionDTO | null> {
  private static instance: MenuPermissionUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.MenuPermissionRepository();
  private mapper = InjectionPlatformEntitiesMenuPermissionMapper.MenuPermissionUpdateMapper();

  public static getInstance(): MenuPermissionUpdateUseCase {
    if (!MenuPermissionUpdateUseCase.instance)
      MenuPermissionUpdateUseCase.instance = new MenuPermissionUpdateUseCase();
    return MenuPermissionUpdateUseCase.instance;
  }

  public async execute(params: IMenuPermissionUpdateDTO, config?: IConfigDTO): Promise<IMenuPermissionDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}