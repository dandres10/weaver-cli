import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IMenuPermissionDTO } from "@platform/domain/models/apis/platform/entities/menupermission";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class MenuPermissionListUseCase implements UseCase<IPaginationBackendDTO, IMenuPermissionDTO[] | null> {
  private static instance: MenuPermissionListUseCase;
  private repository = InjectionPlatformEntitiesRepository.MenuPermissionRepository();

  public static getInstance(): MenuPermissionListUseCase {
    if (!MenuPermissionListUseCase.instance)
      MenuPermissionListUseCase.instance = new MenuPermissionListUseCase();
    return MenuPermissionListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IMenuPermissionDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}