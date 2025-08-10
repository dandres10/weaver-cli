import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IRolPermissionDTO } from "@bus/domain/models/apis/platform/entities/rolpermission";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class RolPermissionListUseCase implements UseCase<IPaginationBackendDTO, IRolPermissionDTO[] | null> {
  private static instance: RolPermissionListUseCase;
  private repository = InjectionPlatformEntitiesRepository.RolPermissionRepository();

  public static getInstance(): RolPermissionListUseCase {
    if (!RolPermissionListUseCase.instance)
      RolPermissionListUseCase.instance = new RolPermissionListUseCase();
    return RolPermissionListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IRolPermissionDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}