import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IMenuDTO, IMenuUpdateDTO } from "@bus/domain/models/apis/platform/entities/menu";
import { InjectionPlatformEntitiesMenuMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-menu-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class MenuUpdateUseCase implements UseCase<IMenuUpdateDTO, IMenuDTO | null> {
  private static instance: MenuUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.MenuRepository();
  private mapper = InjectionPlatformEntitiesMenuMapper.MenuUpdateMapper();

  public static getInstance(): MenuUpdateUseCase {
    if (!MenuUpdateUseCase.instance)
      MenuUpdateUseCase.instance = new MenuUpdateUseCase();
    return MenuUpdateUseCase.instance;
  }

  public async execute(params: IMenuUpdateDTO, config?: IConfigDTO): Promise<IMenuDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}