import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IUserDTO } from "@bus/domain/models/apis/platform/entities/user";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class UserListUseCase implements UseCase<IPaginationBackendDTO, IUserDTO[] | null> {
  private static instance: UserListUseCase;
  private repository = InjectionPlatformEntitiesRepository.UserRepository();

  public static getInstance(): UserListUseCase {
    if (!UserListUseCase.instance)
      UserListUseCase.instance = new UserListUseCase();
    return UserListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IUserDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}