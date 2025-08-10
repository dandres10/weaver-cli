import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IMenuDTO, IMenuDeleteDTO } from "@bus/domain/models/apis/platform/entities/menu";
import { InjectionPlatformEntitiesMenuMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-menu-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class MenuDeleteUseCase implements UseCase<IMenuDeleteDTO, IMenuDTO | null> {
  private static instance: MenuDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.MenuRepository();
  private mapper = InjectionPlatformEntitiesMenuMapper.MenuDeleteMapper();

  public static getInstance(): MenuDeleteUseCase {
    if (!MenuDeleteUseCase.instance)
      MenuDeleteUseCase.instance = new MenuDeleteUseCase();
    return MenuDeleteUseCase.instance;
  }

  public async execute(params: IMenuDeleteDTO, config?: IConfigDTO): Promise<IMenuDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}