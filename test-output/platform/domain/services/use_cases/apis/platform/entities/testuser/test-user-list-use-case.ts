import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ITestUserDTO } from "@platform/domain/models/apis/platform/entities/testuser";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class TestUserListUseCase implements UseCase<IPaginationBackendDTO, ITestUserDTO[] | null> {
  private static instance: TestUserListUseCase;
  private repository = InjectionPlatformEntitiesRepository.TestUserRepository();

  public static getInstance(): TestUserListUseCase {
    if (!TestUserListUseCase.instance)
      TestUserListUseCase.instance = new TestUserListUseCase();
    return TestUserListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ITestUserDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}