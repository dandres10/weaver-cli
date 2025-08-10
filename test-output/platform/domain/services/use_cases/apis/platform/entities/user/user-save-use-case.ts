import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IUserDTO, IUserSaveDTO } from "@bus/domain/models/apis/platform/entities/user";
import { InjectionPlatformEntitiesUserMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-user-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class UserSaveUseCase implements UseCase<IUserSaveDTO, IUserDTO | null> {
  private static instance: UserSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.UserRepository();
  private mapper = InjectionPlatformEntitiesUserMapper.UserSaveMapper();

  public static getInstance(): UserSaveUseCase {
    if (!UserSaveUseCase.instance)
      UserSaveUseCase.instance = new UserSaveUseCase();
    return UserSaveUseCase.instance;
  }

  public async execute(params: IUserSaveDTO, config?: IConfigDTO): Promise<IUserDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}