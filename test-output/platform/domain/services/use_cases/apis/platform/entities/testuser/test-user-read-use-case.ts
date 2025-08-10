import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ITestUserDTO, ITestUserReadDTO } from "@platform/domain/models/apis/platform/entities/testuser";
import { InjectionPlatformEntitiesTestUserMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-test-user-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class TestUserReadUseCase implements UseCase<ITestUserReadDTO, ITestUserDTO | null> {
  private static instance: TestUserReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.TestUserRepository();
  private mapper = InjectionPlatformEntitiesTestUserMapper.TestUserReadMapper();

  public static getInstance(): TestUserReadUseCase {
    if (!TestUserReadUseCase.instance)
      TestUserReadUseCase.instance = new TestUserReadUseCase();
    return TestUserReadUseCase.instance;
  }

  public async execute(params: ITestUserReadDTO, config?: IConfigDTO): Promise<ITestUserDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}