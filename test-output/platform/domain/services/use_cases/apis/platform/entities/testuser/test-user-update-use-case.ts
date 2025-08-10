import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ITestUserDTO, ITestUserUpdateDTO } from "@platform/domain/models/apis/platform/entities/testuser";
import { InjectionPlatformEntitiesTestUserMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-test-user-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class TestUserUpdateUseCase implements UseCase<ITestUserUpdateDTO, ITestUserDTO | null> {
  private static instance: TestUserUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.TestUserRepository();
  private mapper = InjectionPlatformEntitiesTestUserMapper.TestUserUpdateMapper();

  public static getInstance(): TestUserUpdateUseCase {
    if (!TestUserUpdateUseCase.instance)
      TestUserUpdateUseCase.instance = new TestUserUpdateUseCase();
    return TestUserUpdateUseCase.instance;
  }

  public async execute(params: ITestUserUpdateDTO, config?: IConfigDTO): Promise<ITestUserDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}