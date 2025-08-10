import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IMenuDTO } from "@bus/domain/models/apis/platform/entities/menu";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class MenuListUseCase implements UseCase<IPaginationBackendDTO, IMenuDTO[] | null> {
  private static instance: MenuListUseCase;
  private repository = InjectionPlatformEntitiesRepository.MenuRepository();

  public static getInstance(): MenuListUseCase {
    if (!MenuListUseCase.instance)
      MenuListUseCase.instance = new MenuListUseCase();
    return MenuListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IMenuDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}