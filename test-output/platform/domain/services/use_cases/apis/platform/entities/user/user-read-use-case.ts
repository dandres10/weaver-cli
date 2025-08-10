import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IUserDTO, IUserReadDTO } from "@bus/domain/models/apis/platform/entities/user";
import { InjectionPlatformEntitiesUserMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-user-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class UserReadUseCase implements UseCase<IUserReadDTO, IUserDTO | null> {
  private static instance: UserReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.UserRepository();
  private mapper = InjectionPlatformEntitiesUserMapper.UserReadMapper();

  public static getInstance(): UserReadUseCase {
    if (!UserReadUseCase.instance)
      UserReadUseCase.instance = new UserReadUseCase();
    return UserReadUseCase.instance;
  }

  public async execute(params: IUserReadDTO, config?: IConfigDTO): Promise<IUserDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}