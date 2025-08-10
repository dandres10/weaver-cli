import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IMenuDTO, IMenuSaveDTO } from "@bus/domain/models/apis/platform/entities/menu";
import { InjectionPlatformEntitiesMenuMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-menu-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class MenuSaveUseCase implements UseCase<IMenuSaveDTO, IMenuDTO | null> {
  private static instance: MenuSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.MenuRepository();
  private mapper = InjectionPlatformEntitiesMenuMapper.MenuSaveMapper();

  public static getInstance(): MenuSaveUseCase {
    if (!MenuSaveUseCase.instance)
      MenuSaveUseCase.instance = new MenuSaveUseCase();
    return MenuSaveUseCase.instance;
  }

  public async execute(params: IMenuSaveDTO, config?: IConfigDTO): Promise<IMenuDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}