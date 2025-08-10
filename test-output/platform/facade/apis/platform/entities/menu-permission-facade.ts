import { IConfigDTO } from "@bus/core/interfaces";
import {
  IMenuPermissionDTO,
  IMenuPermissionDeleteDTO,
  IMenuPermissionReadDTO,
  IMenuPermissionSaveDTO,
  IMenuPermissionUpdateDTO,
} from "@platform/domain/models/apis/platform/entities/menupermission";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesMenuPermissionUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-menu-permission-use-case";

export class MenuPermissionFacade {
  private static instance: MenuPermissionFacade;

  private readonly readUseCase = InjectionPlatformEntitiesMenuPermissionUseCase.MenuPermissionReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesMenuPermissionUseCase.MenuPermissionSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesMenuPermissionUseCase.MenuPermissionUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesMenuPermissionUseCase.MenuPermissionDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesMenuPermissionUseCase.MenuPermissionListUseCase();

  public static getInstance(): MenuPermissionFacade {
    if (!MenuPermissionFacade.instance)
      MenuPermissionFacade.instance = new MenuPermissionFacade();
    return MenuPermissionFacade.instance;
  }

  public async read(params: IMenuPermissionReadDTO, config?: IConfigDTO): Promise<IMenuPermissionDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: IMenuPermissionSaveDTO, config?: IConfigDTO): Promise<IMenuPermissionDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: IMenuPermissionUpdateDTO, config?: IConfigDTO): Promise<IMenuPermissionDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: IMenuPermissionDeleteDTO, config?: IConfigDTO): Promise<IMenuPermissionDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IMenuPermissionDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}