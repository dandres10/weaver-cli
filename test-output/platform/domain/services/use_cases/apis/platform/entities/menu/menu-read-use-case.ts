import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IMenuDTO, IMenuReadDTO } from "@bus/domain/models/apis/platform/entities/menu";
import { InjectionPlatformEntitiesMenuMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-menu-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class MenuReadUseCase implements UseCase<IMenuReadDTO, IMenuDTO | null> {
  private static instance: MenuReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.MenuRepository();
  private mapper = InjectionPlatformEntitiesMenuMapper.MenuReadMapper();

  public static getInstance(): MenuReadUseCase {
    if (!MenuReadUseCase.instance)
      MenuReadUseCase.instance = new MenuReadUseCase();
    return MenuReadUseCase.instance;
  }

  public async execute(params: IMenuReadDTO, config?: IConfigDTO): Promise<IMenuDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}