import { IConfigDTO } from "@bus/core/interfaces";
import {
  IMenuDTO,
  IMenuDeleteDTO,
  IMenuReadDTO,
  IMenuSaveDTO,
  IMenuUpdateDTO,
} from "@platform/domain/models/apis/platform/entities/menu";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesMenuUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-menu-use-case";

export class MenuFacade {
  private static instance: MenuFacade;

  private readonly readUseCase = InjectionPlatformEntitiesMenuUseCase.MenuReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesMenuUseCase.MenuSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesMenuUseCase.MenuUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesMenuUseCase.MenuDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesMenuUseCase.MenuListUseCase();

  public static getInstance(): MenuFacade {
    if (!MenuFacade.instance)
      MenuFacade.instance = new MenuFacade();
    return MenuFacade.instance;
  }

  public async read(params: IMenuReadDTO, config?: IConfigDTO): Promise<IMenuDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: IMenuSaveDTO, config?: IConfigDTO): Promise<IMenuDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: IMenuUpdateDTO, config?: IConfigDTO): Promise<IMenuDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: IMenuDeleteDTO, config?: IConfigDTO): Promise<IMenuDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IMenuDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}