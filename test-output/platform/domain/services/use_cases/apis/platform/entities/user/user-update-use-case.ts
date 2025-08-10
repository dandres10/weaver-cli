import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IUserDTO, IUserUpdateDTO } from "@bus/domain/models/apis/platform/entities/user";
import { InjectionPlatformEntitiesUserMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-user-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class UserUpdateUseCase implements UseCase<IUserUpdateDTO, IUserDTO | null> {
  private static instance: UserUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.UserRepository();
  private mapper = InjectionPlatformEntitiesUserMapper.UserUpdateMapper();

  public static getInstance(): UserUpdateUseCase {
    if (!UserUpdateUseCase.instance)
      UserUpdateUseCase.instance = new UserUpdateUseCase();
    return UserUpdateUseCase.instance;
  }

  public async execute(params: IUserUpdateDTO, config?: IConfigDTO): Promise<IUserDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}