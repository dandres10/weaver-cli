import { IConfigDTO } from "@bus/core/interfaces";
import {
  ITestUserDTO,
  ITestUserDeleteDTO,
  ITestUserReadDTO,
  ITestUserSaveDTO,
  ITestUserUpdateDTO,
} from "@platform/domain/models/apis/platform/entities/testuser";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesTestUserUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-test-user-use-case";

export class TestUserFacade {
  private static instance: TestUserFacade;

  private readonly readUseCase = InjectionPlatformEntitiesTestUserUseCase.TestUserReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesTestUserUseCase.TestUserSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesTestUserUseCase.TestUserUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesTestUserUseCase.TestUserDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesTestUserUseCase.TestUserListUseCase();

  public static getInstance(): TestUserFacade {
    if (!TestUserFacade.instance)
      TestUserFacade.instance = new TestUserFacade();
    return TestUserFacade.instance;
  }

  public async read(params: ITestUserReadDTO, config?: IConfigDTO): Promise<ITestUserDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: ITestUserSaveDTO, config?: IConfigDTO): Promise<ITestUserDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: ITestUserUpdateDTO, config?: IConfigDTO): Promise<ITestUserDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: ITestUserDeleteDTO, config?: IConfigDTO): Promise<ITestUserDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ITestUserDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}