import { IConfigDTO } from "@bus/core/interfaces";
import {
  IRolPermissionDTO,
  IRolPermissionDeleteDTO,
  IRolPermissionReadDTO,
  IRolPermissionSaveDTO,
  IRolPermissionUpdateDTO,
} from "@bus/domain/models/apis/platform/entities/rolpermission";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesRolPermissionUseCase } from "@bus/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-rol-permission-use-case";

export class RolPermissionFacade {
  private static instance: RolPermissionFacade;

  private readonly readUseCase = InjectionPlatformEntitiesRolPermissionUseCase.RolPermissionReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesRolPermissionUseCase.RolPermissionSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesRolPermissionUseCase.RolPermissionUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesRolPermissionUseCase.RolPermissionDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesRolPermissionUseCase.RolPermissionListUseCase();

  public static getInstance(): RolPermissionFacade {
    if (!RolPermissionFacade.instance)
      RolPermissionFacade.instance = new RolPermissionFacade();
    return RolPermissionFacade.instance;
  }

  public async read(params: IRolPermissionReadDTO, config?: IConfigDTO): Promise<IRolPermissionDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: IRolPermissionSaveDTO, config?: IConfigDTO): Promise<IRolPermissionDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: IRolPermissionUpdateDTO, config?: IConfigDTO): Promise<IRolPermissionDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: IRolPermissionDeleteDTO, config?: IConfigDTO): Promise<IRolPermissionDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IRolPermissionDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}