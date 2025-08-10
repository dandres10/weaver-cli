import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IUserDTO, IUserDeleteDTO } from "@bus/domain/models/apis/platform/entities/user";
import { InjectionPlatformEntitiesUserMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-user-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class UserDeleteUseCase implements UseCase<IUserDeleteDTO, IUserDTO | null> {
  private static instance: UserDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.UserRepository();
  private mapper = InjectionPlatformEntitiesUserMapper.UserDeleteMapper();

  public static getInstance(): UserDeleteUseCase {
    if (!UserDeleteUseCase.instance)
      UserDeleteUseCase.instance = new UserDeleteUseCase();
    return UserDeleteUseCase.instance;
  }

  public async execute(params: IUserDeleteDTO, config?: IConfigDTO): Promise<IUserDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}