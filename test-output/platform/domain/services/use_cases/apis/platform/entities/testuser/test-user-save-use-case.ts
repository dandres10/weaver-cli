import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ITestUserDTO, ITestUserSaveDTO } from "@platform/domain/models/apis/platform/entities/testuser";
import { InjectionPlatformEntitiesTestUserMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-test-user-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class TestUserSaveUseCase implements UseCase<ITestUserSaveDTO, ITestUserDTO | null> {
  private static instance: TestUserSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.TestUserRepository();
  private mapper = InjectionPlatformEntitiesTestUserMapper.TestUserSaveMapper();

  public static getInstance(): TestUserSaveUseCase {
    if (!TestUserSaveUseCase.instance)
      TestUserSaveUseCase.instance = new TestUserSaveUseCase();
    return TestUserSaveUseCase.instance;
  }

  public async execute(params: ITestUserSaveDTO, config?: IConfigDTO): Promise<ITestUserDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}